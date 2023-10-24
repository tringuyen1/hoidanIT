import { NextRequest, NextResponse } from "next/server.js"


export async function GET (request: NextRequest, response:NextResponse) {
    // connect to db 
    // crud db
    // return res for client
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${searchParams.get("audio")}`);
}