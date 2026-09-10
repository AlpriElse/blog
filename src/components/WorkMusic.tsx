import { useEffect, useMemo, useState } from "react";
import {
  WORK_MUSIC_TAGS,
  WORK_MUSIC_VIDEOS,
  embedUrl,
  thumbnailUrl,
  type WorkMusicTag,
  type WorkMusicVideo,
} from "../data/workMusic.ts";

type Filter = "All" | WorkMusicTag;

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export default function WorkMusic() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<WorkMusicVideo | null>(null);
  const [allVideos, setAllVideos] = useState(WORK_MUSIC_VIDEOS);

  useEffect(() => {
    setAllVideos(shuffle(WORK_MUSIC_VIDEOS));
  }, []);

  const chips: Filter[] = ["All", ...WORK_MUSIC_TAGS];

  const videos = useMemo(
    () =>
      filter === "All"
        ? allVideos
        : WORK_MUSIC_VIDEOS.filter(video => video.tags.includes(filter)),
    [filter, allVideos]
  );

  return (
    <div className="work-music">
      <div className="chip-row" role="tablist" aria-label="Filter work music">
        {chips.map(chip => {
          const selected = chip === filter;
          return (
            <button
              key={chip}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`chip${selected ? " chip-active" : ""}`}
              onClick={() => setFilter(chip)}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {active && (
        <div className="now-playing">
          <div className="player-frame">
            <iframe
              key={active.id}
              src={embedUrl(active, true)}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="now-playing-meta">
            <h2>{active.title}</h2>
            <p>{active.channel}</p>
          </div>
        </div>
      )}

      <ul className="video-grid">
        {videos.map(video => {
          const isPlaying = active?.id === video.id;
          return (
            <li key={video.id}>
              <button
                type="button"
                className={`video-card${isPlaying ? " video-card-active" : ""}`}
                onClick={() => setActive(video)}
              >
                <span className="thumb-wrap">
                  <img src={thumbnailUrl(video.id)} alt="" loading="lazy" />
                  {isPlaying && <span className="now-badge">Playing</span>}
                </span>
                <span className="video-meta">
                  <span className="video-title">{video.title}</span>
                  <span className="video-channel">{video.channel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
