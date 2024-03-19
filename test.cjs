const axios = require("axios");
const cheerio = require("cheerio");
const { writeSync, writeFileSync } = require("fs");

function downloadTwitterVideo(url) {
  const apiUrl = `https://twitsave.com/info?url=${url}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const data = cheerio.load(response.data);
      const downloadButton = data(".origin-top-right").eq(0);
      const qualityButtons = downloadButton.find("a");
      const highestQualityUrl = qualityButtons.eq(0).attr("href");
      const base64Data = fetch(highestQualityUrl)
        .then((data) => data.arrayBuffer())
        .then((data) => {
          const bytes = new Uint8Array(data);
          console.log(bytes);
          writeFileSync("./download.mp4", bytes);
        });
      // const fileName = data('.leading-tight p.m-2').eq(0).text().replace(/[^a-zA-Z0-9]+/g, ' ').trim() + '.mp4';
      // downloadVideo(highestQualityUrl, fileName);
    })
    .catch((error) => {
      console.error("Error fetching Twitter video:", error);
    });
}
downloadTwitterVideo("https://twitter.com/i/status/1769546493264838750");
