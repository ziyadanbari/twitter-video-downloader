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
      "X-RapidAPI-Key": "8058f8f606mshe2bf5e6b030e7edp1d61a1jsndc416c7246d6",
      "X-RapidAPI-Host":
        "twitter-downloader-download-twitter-videos-gifs-and-images.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data; // Return response.data instead of response
}
