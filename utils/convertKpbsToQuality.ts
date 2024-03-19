export function kbpsToResolution(kbps: number) {
    if (kbps < 300) {
        return "Below 240p"; // Lower than 300 kbps is typically below 240p
    } else if (kbps >= 300 && kbps < 700) {
        return "240p"; // 300-700 kbps is typically considered 240p
    } else if (kbps >= 700 && kbps < 1500) {
        return "360p"; // 700-1500 kbps is typically considered 360p
    } else if (kbps >= 1500 && kbps < 3000) {
        return "480p"; // 1500-3000 kbps is typically considered 480p
    } else if (kbps >= 3000 && kbps < 5000) {
        return "720p"; // 3000-5000 kbps is typically considered 720p
    } else if (kbps >= 5000 && kbps < 8000) {
        return "1080p"; // 5000-8000 kbps is typically considered 1080p
    } else if (kbps >= 8000 && kbps < 15000) {
        return "1440p"; // 8000-15000 kbps is typically considered 1440p
    } else if (kbps >= 15000 && kbps < 30000) {
        return "4K"; // 15000-30000 kbps is typically considered 4K
    } else {
        return "Above 4K"; // kbps higher than 30000 kbps is usually above 4K
    }
}
