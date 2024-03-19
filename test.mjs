import getTwitterMedia from "get-twitter-media";
let media = await getTwitterMedia(
  "https://twitter.com/TurnkeyPet/status/1523047586998865920",
  {
    text: true,
  }
);
console.log(media);
