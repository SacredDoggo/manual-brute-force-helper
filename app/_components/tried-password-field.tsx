"use client";

import { useEffect, useState } from "react";
import { TriedPasswordCard } from "./tried-password-card";
import { useSharedState } from "@/providers/shared-state-provider";
import { usePasswordDeleteConfirmDialogStore } from "@/store/password-delete-confirm-dialog-store";

export const TriedPasswordField = () => {
    const { passwords, setPasswords } = useSharedState();
    const pdcds = usePasswordDeleteConfirmDialogStore();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/password")
            .then(data => data.json())
            .then(json => setPasswords(json.tried_password))
            .then(() => setLoading(false));
    }, []);

    // Handle delete click using Event Delegation
    const handlePasswordDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLElement).closest(".delete-button");
        if (!target) return;

        if (target.getAttribute("password-index") != null && target.getAttribute("password-id") != null) {
            const index = target.getAttribute("password-index");
            if (!index) return;
            const indexToBeDeleted = parseInt(index);
            if (isNaN(indexToBeDeleted)) return;

            const id = target.getAttribute("password-id");
            if (!id) return;

            const password = target.getAttribute("password-text");
            if (!password) return;

            if (e.button == 0) {
                // TODO
                pdcds.setTriedPasswordToBeDeleted(password);
                pdcds.setTriedPasswordToBeDeletedId(id);
                pdcds.setTriedPasswordToBeDeletedIndex(indexToBeDeleted);

                pdcds.openConfirmDialog();
            }
        }
    };

    if (loading) return <div className="h-full w-full flex items-center justify-center">Loading...</div>

    return (
        <div className="h-full p-4 overflow-y-auto">
            {passwords.length == 0 && <p className="text-sm text-center">No entry found.</p>}
            <div className="flex flex-wrap gap-x-2 gap-y-2" onClick={handlePasswordDeleteClick}>
                {passwords.map((password, _index) => (
                    <TriedPasswordCard key={password.id} id={password.id} tried_password={password.password} index={_index} />
                ))}
            </div>
        </div>
    );
}