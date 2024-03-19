export enum MediaTypes {
  video = "video",
  photo = "photo",
  animated_gif = "animated_gif",
}

export interface Media {
  type: MediaTypes;
  duration?: number;
  media: MediaMetaData[];
  description?: string;
  profile: string;
  name: string;
  screen_name: string;
}

export interface MediaMetaData {
  url: string;
  bitrate?: number;
  content_type?: string;
}
