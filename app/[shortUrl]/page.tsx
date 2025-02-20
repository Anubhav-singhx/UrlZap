import { notFound, redirect } from 'next/navigation';
import clientPromise from "../../lib/mongodb";

export default async function Page({ params }: { params: { shortUrl?: string } }) {
  // Ensure params exist before using them
  if (!params || typeof params !== 'object') {
    return notFound();
  }

  //console.log('params: ', params);
  
  const { shortUrl } = params; // Extract the short URL safely
  //console.log("shortURL from page: ", shortUrl);

  if (!shortUrl) {
    return notFound();
  }

  const normalizedShortUrl = shortUrl.toLowerCase();
    const client = await clientPromise;
    const db = client.db("urlzap");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shortUrl: normalizedShortUrl });

    if (!doc?.url) {
      return notFound();
    }

    // Perform the redirection properly
    //console.log("redirectURL: ", doc.url);
    redirect(doc.url);
}
