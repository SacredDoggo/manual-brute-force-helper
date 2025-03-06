import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { hasEnoughTimePassed } from "@/lib/utils";

export async function POST(req: NextRequest) {
    if (!hasEnoughTimePassed(req))
        return NextResponse.json({ error: "Requests too frequent" }, { status: 429 });

    const { userId } = await auth();
    if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { password } = await req.json();
    if (!password)
        return NextResponse.json({ error: "bad request", message: "Arguments missing" });

    try {

        const duplicate_password = await prisma.triedPassword.findUnique({
            where: {
                user_id_password: {
                    user_id: userId,
                    password: password
                }
            }
        });

        if (duplicate_password != null) return NextResponse.json({ error: "Password already exists" }, { status: 409 });

        const tried_password = await prisma.triedPassword.create({
            data: {
                user_id: userId,
                password: password
            }
        });

        return NextResponse.json({ password: tried_password });
    } catch (error) {
        return NextResponse.json({ error: "error", message: error }, { status: 500 });
    }
};

export async function GET(req: NextRequest) {
    if (!hasEnoughTimePassed(req))
        return NextResponse.json({ message: "Requests too frequent" }, { status: 429 });

    const { userId } = await auth();

    if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const tried_password = await prisma.triedPassword.findMany({
            where: {
                user_id: userId,
            },
            orderBy: { created_at: "desc" }
        });

        return NextResponse.json({ tried_password });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error });
    }
}
