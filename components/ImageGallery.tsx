import { MediaMetaData } from "@/app/page";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import React, { useState } from "react";

export default function ImageGallery({ medias }: { medias: MediaMetaData[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleDownload = () => {
    medias.forEach(({ url }: { url: string }) => {
      fetch(url, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${Date.now()}.jpg`); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="h-full">
      <div className="h-full  flex flex-col gap-2">
        <div className="relative flex-1">
          <div className="absolute top-2 left-2">
            {currentIndex + 1}/{medias.length}
          </div>
          <div>
            <div
              className="absolute top-2/4 right-0 -translate-y-2/4 cursor-pointer z-50"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === medias.length - 1 ? 0 : prev + 1
                )
              }>
              <ChevronRight />
            </div>
            <div
              className="absolute top-2/4 left-0 -translate-y-2/4 cursor-pointer z-50"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? medias.length - 1 : prev - 1
                )
              }>
              <ChevronLeft />
            </div>
          </div>
          <div className="h-full">
            {medias.map(({ url }: { url: string }, index: number) => (
              <div
                key={index}
                className=" select-none h-full"
                style={{
                  background: `url('${url}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}></div>
            ))}
          </div>
        </div>
        <div>
          <button
            className="w-full bg-blue-500 py-2 rounded flex items-center gap-2 text-center text-white justify-center hover:bg-blue-600"
            onClick={handleDownload}>
            <div>
              <Download />
            </div>
            <div>Download</div>
          </button>
        </div>
      </div>
    </div>
  );
}
