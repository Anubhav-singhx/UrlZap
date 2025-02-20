"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!url || !shortUrl) {
      alert("Please fill in both fields");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim(), shortUrl: shortUrl.trim() }),
    };

    try {
      const response = await fetch("/api/generate", requestOptions);
      const result = await response.json();

      if (result.success) {
        const generatedUrl = `${window.location.origin}/${shortUrl}`;
        setGenerated(generatedUrl);
        setShortUrl("");
        setUrl("");
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error generating URL");
    }
  };

  return (
    <div>
      <div className="h-[40vh] gap-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl">UrlZap</h2>
        <h1 className="text-5xl">Shorten Your Loooong Links</h1>
        <h4 className="text-xl">
          UrlZap is an efficient and easy-to-use URL shortening service that streamlines your online experience
        </h4>
      </div>
      <form action="" className="flex justify-center gap-5">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-violet-50 outline-none w-[500px] py-3 px-4 rounded-md"
          type="text"
          placeholder="Enter the link"
          name="url"
        />
        <input
          value={shortUrl}
          type="text"
          name="shortUrl"
          onChange={(e) => setShortUrl(e.target.value)}
          placeholder="Enter Your Preferred Short URL"
          className="bg-violet-50 outline-none w-[500px] py-3 px-4 rounded-md"
        />
        <button
          type="button"
          onClick={generate}
          className="bg-violet-400 p-2 rounded-md"
        >
          Shorten
        </button>
      </form>
      {generated && (
        <div className="mt-12 text-center mx-auto bg-violet-300 flex gap-5 w-[30vw] h-[7vh] rounded-lg items-center justify-center">
          Your Link:{" "}
          <Link className="" href={generated} target="_blank">
            {generated}
          </Link>
        </div>
      )}
    </div>
  );
}
