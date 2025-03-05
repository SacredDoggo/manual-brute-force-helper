"use client";

import { UserButton } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface InputFieldInterface {
    passwords: TriedPassword[];
    setPasswords: Dispatch<SetStateAction<TriedPassword[]>>
}

export const InputField = ({ passwords, setPasswords }: InputFieldInterface) => {
    const [passwordValue, setPasswordValue] = useState<string>("");
    const handleAdd = () => {
        const password = passwordValue.trim();
        try {
        fetch("/api/password", {
            method: "POST",
            body: JSON.stringify({
                password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(data => data.json())
            .then((data) => {
                if (!!data.status) toast.error("Password already exists");
                else setPasswords([data.password, ...passwords]);
            })
            .then(() => setPasswordValue(""));
    } catch (error) {
        toast.error("Error adding password");
        console.error(error);
    }
    }
    return (
        <div className="flex justify-center items-center w-full gap-x-2 h-10">
            <input
                className="w-full md:w-md lg:w-lg max-w-3xl bg-[#cfcfcf] dark:bg-[#1f1f1f] ring-0 outline-none p-2 rounded-sm text-center"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
            />
            <button className="bg-black text-white dark:bg-white dark:text-black dark:hover:bg-white/90 cursor-pointer p-2 rounded-sm" onClick={handleAdd}>Add</button>
            <UserButton />
        </div>
    );
}