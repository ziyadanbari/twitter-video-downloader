// server.ts
import axios from "axios";

export async function getMediaLink(url: string) {
  const options = {
    method: "GET",
    url: "https://twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com/status",
    params: {
      url,
    },
    headers: {
      "X-RapidAPI-Key": "73cfd2a0ecmshbc5e01564a432abp1d656ajsn2878a3f3e2dc",
      "X-RapidAPI-Host":
        "twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data; // Return response.data instead of response
}
