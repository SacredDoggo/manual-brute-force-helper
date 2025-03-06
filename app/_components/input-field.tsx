"use client";

import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { useSharedState } from "@/providers/shared-state-provider";


export const InputField = () => {
    const { passwords, setPasswords } = useSharedState();

    const [sending, setSending] = useState<boolean>(false);

    const [passwordValue, setPasswordValue] = useState<string>("");

    const handleAdd = async () => {
        if (sending == true) return;
        
        const password = passwordValue.trim();
        if (password.length == 0) {
            toast.info("Password cannot be empty!");
            return;
        }
        setSending(true);
        await new Promise(resolve => setTimeout(resolve, 4000))

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
                    if (!data.password) toast.error("Password already exists or some other error");
                    else {
                        setPasswords([data.password, ...passwords]);
                        setPasswordValue("");
                    }
                });

            setSending(false);

        } catch (error) {
            toast.error("Error adding password");
            console.error(error);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    }

    return (
        <div className="flex justify-center items-center w-full gap-x-2 h-10">
            <input
                className={`w-full md:w-md lg:w-lg max-w-3xl bg-[#cfcfcf] dark:bg-[#1f1f1f] ring-0 outline-none p-2 rounded-sm text-center ${sending && "text-zinc-300"}`}
                value={passwordValue}
                onChange={(e) => {if (!sending) setPasswordValue(e.target.value)}}
                onKeyDown={handleKeyDown}
                placeholder="Enter your recently tried password"
            />
            <button
                className="bg-black text-white dark:bg-white dark:text-black dark:hover:bg-white/90 cursor-pointer p-2 rounded-sm"
                onClick={handleAdd}
                disabled={sending}
            >
                Add
            </button>
            <UserButton />
        </div>
    );
}