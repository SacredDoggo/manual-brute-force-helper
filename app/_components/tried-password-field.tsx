"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TriedPasswordCard } from "./tried-password-card";

interface TriedPasswordFieldInterface {
    passwords: TriedPassword[];
    setPasswords: Dispatch<SetStateAction<TriedPassword[]>>
}

export const TriedPasswordField = ({ passwords, setPasswords }: TriedPasswordFieldInterface) => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch("/api/password")
            .then(data => data.json())
            .then(json => setPasswords(json.tried_password))
            .then(() => setLoading(false));
    }, []);

    if (loading) return <div className="h-full w-full flex items-center justify-center">Loading...</div>

    return (
        <div className="h-full p-4 overflow-y-auto">
            {passwords.length == 0 && <p className="text-sm text-center">No entry found.</p>}
            <div className="flex flex-wrap gap-x-2 gap-y-2">
                {passwords.map((password, _index) => (
                    <TriedPasswordCard key={password.id + _index} id={password.id} tried_password={password.password} />
                ))}
            </div>
        </div>
    );
}