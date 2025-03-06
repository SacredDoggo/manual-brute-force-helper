import { hasEnoughTimePassed } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!hasEnoughTimePassed(req))
        return NextResponse.json({ error: "Requests too frequent" }, { status: 429 });

    const { userId } = await auth();
    if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const tried_Password_to_be_deleted = await prisma.triedPassword.findUnique({
            where: {
                user_id: userId,
                id: (await params).id
            }
        });

        if (!tried_Password_to_be_deleted) return NextResponse.json({ error: "No record found" }, { status: 404 });

        await prisma.triedPassword.delete({
            where: {
                user_id: userId,
                id: (await params).id
            }
        });

        const deleted_password = await prisma.deletedTriedPassword.create({
            data: {
                user_id: userId,
                password: tried_Password_to_be_deleted.password
            }
        })

        return NextResponse.json({ deleted_password }, { status: 200 });
    } catch (error) {
        console.error("Database error:", error); // Add this
        return NextResponse.json(
            { error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}