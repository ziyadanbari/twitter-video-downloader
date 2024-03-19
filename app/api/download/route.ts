import axios from "axios";
import cheerio from "cheerio";
import { Buffer } from "buffer";

async function downloadTwitterVideo(url: string): Promise<string | null> {
  try {
    console.log(url);
    const apiUrl = `https://twitsave.com/info?url=${url}`;
    const response = await axios.get(apiUrl);
    const data = cheerio.load(response.data);
    const downloadButton = data(".origin-top-right").eq(0);
    const qualityButtons = downloadButton.find("a");
    const highestQualityUrl: string | undefined = qualityButtons
      .eq(0)
      .attr("href");

    if (!highestQualityUrl) {
      throw new Error("Could not find video URL");
    }
    return highestQualityUrl;
  } catch (error) {
    console.error("Error fetching Twitter video:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { twitterUrl }: { twitterUrl?: string } = (await req.json()) || {};

    if (!twitterUrl) {
      return new Response(
        JSON.stringify({ error: "Twitter URL is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const videoUrl = await downloadTwitterVideo(twitterUrl);
    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Twitter video URL." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch video content");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return Response.json({ base64 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
