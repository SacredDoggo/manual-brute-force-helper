import { NextRequest } from "next/server";
import { timeCheckFunction } from "./ddos-protector";

export const hasEnoughTimePassed = (req: NextRequest): boolean => {
    const forwarded = req.headers.get("x-forwarded-for");
    const clientId = Array.isArray(forwarded) ? forwarded[0] : forwarded || "unknown";

    const isAllowed = timeCheckFunction(clientId as string);

    return isAllowed;
}