import { hasEnoughTimePassed } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!hasEnoughTimePassed(req))
        return NextResponse.json({ message: "Requests too frequent" }, { status: 429 });

    const { userId } = await auth();
    if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await prisma.triedPassword.delete({
            where: {
                user_id: userId,
                id: (await params).id
            }
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error });
    }
}