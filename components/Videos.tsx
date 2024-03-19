"use client";
import { MediaMetaData, MediaTypes } from "@/app/page";
import { kbpsToResolution } from "@/utils/convertKpbsToQuality";
import { Download } from "lucide-react";
import { useState } from "react";

export default function Videos({
  medias,
  type,
}: {
  medias: MediaMetaData[];
  type: MediaTypes;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleDownload = (url: string, content_type: string | undefined) => {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(
            new Blob([buffer], { type: content_type })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${Date.now()}.mp4`); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-full">
      <div className="h-full  flex flex-col gap-2">
        <div className="relative flex-1">
          <div className="h-full">
            <video controls src={medias[0].url} className="w-full h-[300px]" />
          </div>
        </div>
        <div className="relative z-50 mb-10">
          <button
            className="bg-blue-500 w-full py-2 flex justify-center gap-2 items-center text-center font-medium text-white"
            onClick={() => {
              type === MediaTypes.animated_gif
                ? handleDownload(medias[0].url, medias[0].content_type)
                : setOpen((prev) => !prev);
            }}>
            <div>
              <Download />
            </div>
            <div>Download</div>
          </button>
          {open && (
            <div className="  text-white">
              {medias.map((media) => {
                const { bitrate, url, content_type }: MediaMetaData = media;
                if (!bitrate) return null; // Returning null instead of undefined
                return (
                  <div
                    key={url}
                    onClick={() => handleDownload(url, content_type)}
                    className="py-1 cursor-pointer hover:bg-blue-600 bg-blue-500 px-3 font-semibold">
                    {kbpsToResolution(bitrate / 1000)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
