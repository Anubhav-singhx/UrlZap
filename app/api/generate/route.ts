import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "../../../lib/mongodb";

interface RequestBody {
    url: string;
    shortUrl: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RequestBody;

        if (!body.url || !body.shortUrl) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "URL and short URL are required"
            }, { status: 400 });
        }

        const normalizedUrl = body.url.trim();
        const normalizedShortUrl = body.shortUrl.trim().toLowerCase();

        // Ensure the URL includes http/https
        const urlToStore = normalizedUrl.startsWith('https') ? normalizedUrl : `https://${normalizedUrl}`;

        const client = await clientPromise;
        const db = client.db("urlzap");
        const collection = db.collection("url");

        // Check if short URL already exists
        const existingDoc = await collection.findOne({ shortUrl: normalizedShortUrl });

        if (existingDoc) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "Short URL already exists!"
            }, { status: 400 });
        }

        // Save URL in the database
        await collection.insertOne({
            url: urlToStore,
            shortUrl: normalizedShortUrl
        });

        return NextResponse.json({
            success: true,
            message: 'URL generated successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error generating URL:', error);
        return NextResponse.json({
            success: false,
            message: 'Error generating URL'
        }, { status: 500 });
    }
}
