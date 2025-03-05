"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    });

    if (!mounted) return <></>;

    return (
        <>
            <ConfirmModal />
        </>
    );
}