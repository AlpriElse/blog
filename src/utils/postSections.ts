export const POST_SECTIONS = {
  "technical-writing": {
    slug: "technical-writing",
    title: "Technical Writing",
    desc: "Notes on software, AI, and building.",
  },
  life: {
    slug: "life",
    title: "Life",
    desc: "Photography, reflections, trip reports, and other notes from outside work.",
  },
} as const;

export type PostSection = keyof typeof POST_SECTIONS;

export const isPostSection = (value: string): value is PostSection =>
  value in POST_SECTIONS;
