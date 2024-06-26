import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request) {
    const comment = await request.json();
    const _id = comment.pageId;
    const pageName = comment.pageName;
    if (request.method !== 'POST') {
        return NextResponse.error("Method Not Allowed", 405);
    }
    await dbConnect();
    try {
        if (!_id || !pageName) {
            return NextResponse.error("Page ID and Page Name are required", 400);
        }
        const newPage = new Page({ _id, pageName });
        const savedPage = await newPage.save();
        return NextResponse.json(savedPage);
    } catch (err) {
        return NextResponse.error(err.message, 500);
    }
}
