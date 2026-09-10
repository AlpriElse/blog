export type WorkMusicTag =
  "Focus" | "Live Mix" | "Soundtrack" | "Bass" | "R&B" | "Korean";

export type WorkMusicVideo = {
  id: string;
  title: string;
  channel: string;
  tags: WorkMusicTag[];
  start?: number;
};

export const WORK_MUSIC_TAGS: WorkMusicTag[] = [
  "Focus",
  "Live Mix",
  "Soundtrack",
  "Bass",
  "R&B",
  "Korean",
];

export const WORK_MUSIC_VIDEOS: WorkMusicVideo[] = [
  {
    id: "3PptWzsrHYw",
    title: "Drone Strike | Contemplative Music for Work and Study",
    channel: "Tom Fox Catalog",
    tags: ["Focus", "Soundtrack"],
  },
  {
    id: "Kr2X0Fo889U",
    title: "SOUNDTRACK: Saudi Arabia's Trillion Dollar Desert City",
    channel: "Tom Fox Catalog",
    tags: ["Focus", "Soundtrack"],
    start: 1881,
  },
  {
    id: "Al4qpqeUzFY",
    title: "Ninajirachi | Full Set (live for triple j's 50th Tour)",
    channel: "triple j",
    tags: ["Live Mix", "Bass"],
    start: 612,
  },
  {
    id: "z0lBfnsrRiM",
    title: "Tiffany Day | Boiler Room London: Tiffany Day",
    channel: "Boiler Room",
    tags: ["Live Mix", "Bass"],
    start: 1392,
  },
  {
    id: "1EaNEtjWw6s",
    title: "ZEDD B2B KNOCK2 @ NITEHARTS 2025 | SAN DIEGO, CA",
    channel: "Knock2",
    tags: ["Live Mix", "Bass"],
    start: 3377,
  },
  {
    id: "ZSGN5qIcPk4",
    title: "Knock2 Live @ Lollapalooza 2025",
    channel: "Knock2",
    tags: ["Live Mix", "Bass"],
  },
  {
    id: "ytjbTz2aXbM",
    title: "Flawed Mangoes - AFTERLIFE (Live Performance Album)",
    channel: "Flawed Mangoes",
    tags: ["Focus", "Live Mix"],
    start: 1551,
  },
  {
    id: "mDqDTHRxKHU",
    title: "SABAI B2B Elephante - Live from Lost In Dreams 2025",
    channel: "SABAI",
    tags: ["Live Mix", "Bass"],
    start: 1760,
  },
  {
    id: "NzkW8V7HnWA",
    title: "불어노래 메들리 필요한 사람 2 (이번엔 찐 고퀄임)",
    channel: "stellajangtv",
    tags: ["Focus", "Korean"],
  },
  {
    id: "WOrBSXcYZHk",
    title: "BASS FLUFF AT THE GYM",
    channel: "Tiffany Day",
    tags: ["Bass"],
  },
  {
    id: "kF3mybMoUos",
    title: "Johnny Chay Live At The Hollywood Palladium | Electrik Seoul",
    channel: "Johnny Chay",
    tags: ["Live Mix", "Bass", "Korean"],
    start: 1098,
  },
  {
    id: "CcUbiviwtCY",
    title: "봄향기 나는 국내 감성 알앤비 | 국내 R&B Remix",
    channel: "앤디제이 ANNDJ",
    tags: ["R&B", "Korean", "Live Mix"],
    start: 882,
  },
  {
    id: "MW8oid8HkfQ",
    title:
      "[PLAYLIST] EP.27 DISH WASH POP PLAYLIST — 설거지할 때 듣기 좋은 팝 플레이리스트",
    channel: "WRIGHT ONA PLANE",
    tags: ["Focus", "Live Mix"],
  },
  {
    id: "2BKazr739po",
    title: "BUNT. at COACHELLA 2026",
    channel: "BUNT. Music",
    tags: ["Live Mix", "Bass"],
    start: 398,
  },
  {
    id: "xETEYG-az9E",
    title: "Make Progressive House Great Again!",
    channel: "Proximity",
    tags: ["Bass", "Focus"],
    start: 1745,
  },
  {
    id: "OVlayZ2LVYE",
    title: "Make Progressive House Great Again 2!",
    channel: "Proximity",
    tags: ["Bass", "Focus"],
    start: 1201,
  },
  {
    id: "3ug0e84EwPA",
    title: "Tech House, Bass House : ELLIA | NUBREED NIGHT / MIXMIX",
    channel: "MIXMIX TV",
    tags: ["Live Mix", "Bass"],
  },
  {
    id: "6MAzUT1YhWE",
    title: "Fred again.. - Rooftop Live (Arun's Roof, London)",
    channel: "Fred again . .",
    tags: ["Live Mix"],
    start: 864,
  },
  {
    id: "uw8_DpBqenI",
    title: "Jacob Collier - Live in Lisbon 2022 [FULL SHOW]",
    channel: "Jacob Collier",
    tags: ["Live Mix"],
  },
  {
    id: "c0-hvjV2A5Y",
    title: "Fred again.. | Boiler Room: London",
    channel: "Boiler Room",
    tags: ["Live Mix", "Bass"],
    start: 462,
  },
  {
    id: "OEKBpboNyGE",
    title: "Morning Coffee Deep House Set | Café Sessions at Ekhaya Vol. 002",
    channel: "Café Sessions",
    tags: ["Focus", "Live Mix"],
    start: 3600,
  },
  {
    id: "gy9cx9GFqU0",
    title: "Hyperpop & Dubstep mix in an NYC Nail Shop | Tiffany Day",
    channel: "PAN!C ROOM",
    tags: ["Live Mix", "Bass"],
    start: 50,
  },
  {
    id: "Ui7Hb4cvamY",
    title: "You Are Solving the Unsolvable | Oppenheimer Soundtrack",
    channel: "Cinematic Focus",
    tags: ["Focus", "Soundtrack"],
  },
  {
    id: "LQrKQVAQ_Q4",
    title:
      "You Are the Only One Who Can Do This | Project Hail Mary Soundtrack",
    channel: "Cinematic Focus",
    tags: ["Focus", "Soundtrack"],
    start: 920,
  },
];

export function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function embedUrl(video: WorkMusicVideo, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (video.start) params.set("start", String(video.start));
  return `https://www.youtube.com/embed/${video.id}?${params.toString()}`;
}
