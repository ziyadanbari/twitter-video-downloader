"use client";
import { useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

export default function TwitterVideoDownloader() {
  const [url, setUrl] = useState<string>("");
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [error, setError] = useState<string | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  function base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || "";
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  const downloadTwitterVideo = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/download", {
        twitterUrl: url,
      });
      const base64: string | undefined = response.data.base64;
      if (!base64) {
        throw new Error("Could not find video URL");
      }

      const blob = base64toBlob(base64, "video/mp4");
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "download.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (error: any) {
      setError("Error fetching Twitter video: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-gray-600 px-4 py-2 rounded border-white border-2"
          placeholder="Enter Twitter video URL"
        />
        <button
          className="bg-blue-500 p-2 rounded mx-4"
          onClick={downloadTwitterVideo}>
          Download Video
        </button>
        <div className="text-center my-2">
          {downloaded && <div>Video downloaded successfully!</div>}
          {error && <div>{error}</div>}
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
