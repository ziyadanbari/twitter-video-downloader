"use client";
import Navbar from "@/components/Navbar";
import { FileVideo, Link } from "lucide-react";
import React, { useState } from "react";
import { getMediaLink } from "../actions/getMediaLink"; // Correct path to getMediaLink
import MediaShow from "@/components/Media";
import { MediaMetaData, MediaTypes, Media } from "@/types";

export default function Page() {
  // Capitalize component name
  const [url, setUrl] = useState<string>("");
  const [media, setMedia] = useState<Media | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await getMediaLink(url);
      const media = response.media;
      const user = response.user;
      const type: MediaTypes = media.photo?.length
        ? MediaTypes.photo
        : media.video.type;
      const data: Media = {
        type,
        duration:
          type === MediaTypes.photo ? undefined : media.video.duration_millis,
        media:
          type === MediaTypes.photo
            ? media.photo.map(({ url }: { url: string }) => ({ url }))
            : media.video.videoVariants,
        profile: user.profile,
        name: user.name,
        screen_name: user.screen_name,
      };
      setMedia(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-full">
      <div className="flex flex-col gap-6 w-full h-full">
        <div>
          <Navbar />
        </div>
        <div className="flex-1 flex justify-center items-center px-4">
          <div className="flex flex-col gap-4">
            <div className="md:text-5xl sm:text-4xl text-3xl font-bold -tracking-wide text-center">
              Twitter video downloader
            </div>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <div className="rounded bg-gray-300 w-full h-full flex items-center gap-3 px-2">
                <span>
                  <Link className=" stroke-gray-500" />
                </span>
                <input
                  value={url}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setUrl(e.currentTarget.value)
                  }
                  className="w-full py-4 bg-transparent outline-none border-none"
                  type="text"
                  placeholder="Tweet link ex: https://twitter.com/Shou..."
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-blue-500 text-lg text-white text-center py-3 w-2/4 rounded font-semibold flex justify-center gap-3 items-center hover:bg-blue-600 transition-all duration-200">
                  {!isLoading ? (
                    <>
                      <div>
                        <FileVideo />
                      </div>
                      <div>Load Medias</div>
                    </>
                  ) : (
                    <span className="loading"></span>
                  )}
                </button>
              </div>
            </form>
            <div className="bg-gray-300 md:w-2/3 w-[90%] aspect-square max-h-[450px] mx-auto rounded p-2">
              {media ? (
                <MediaShow media={media} />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="text-gray-600 text-lg font-medium">
                    No media loaded
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
