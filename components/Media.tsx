import { Media, MediaTypes } from "@/types";
import Image from "next/image";
import ImageGallery from "./ImageGallery";
import Videos from "./Videos";
export default function Media({ media }: { media: Media }) {
  const { duration, name, screen_name, profile, media: medias, type } = media;
  return (
    <div className=" flex flex-col gap-2 h-full">
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={profile}
            width={42}
            height={42}
            alt="profile"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className=" font-medium">{name}</div>
          <div className="text-xs text-gray-400">@{screen_name}</div>
        </div>
      </div>
      <div className="flex-1">
        {type === MediaTypes.photo ? (
          <ImageGallery medias={medias} />
        ) : (
          <Videos type={type} medias={medias} />
        )}
      </div>
    </div>
  );
}
