export const COLORS = {
  dark: "#0d0d0d",
  darker: "#080808",
  light: "#f5f2ed",
  cream: "#ebe6dc",
  accent: "#c45a32",
  accentGlow: "#e8734a",
  teal: "#1d7a8c",
  muted: "#6b6b6b",
  border: "#2a2a2a",
  borderLight: "#1a1a1a",
} as const;

export const INTELLECTUAL_PROPERTIES = [
  {
    id: "publications",
    category: "PUBLICATIONS",
    title: "The Strategy of Shadows",
    description: "Academic rigor meets lived experience. Thought leadership that challenges conventional narratives and reshapes discourse.",
    color: "#c45a32",
  },
  {
    id: "software",
    category: "SOFTWARE",
    title: "Digital Innovation",
    description: "Technology solutions engineered to transform workflows and amplify human potential. Code that creates change.",
    color: "#1d7a8c",
  },
  {
    id: "childrens-book",
    category: "CHILDREN'S BOOK",
    title: "Stories That Shape Tomorrow",
    description: "Imagination meets wisdom. Crafted tales that plant seeds of curiosity and courage in young minds.",
    color: "#d4a574",
  },
  {
    id: "music",
    category: "MUSIC",
    title: "Sonic Landscapes",
    description: "Sound as expression. Compositions that move between worlds, break boundaries, and touch souls.",
    color: "#7c6aef",
  },
  {
    id: "film",
    category: "FILM",
    title: "Visual Narratives",
    description: "Stories captured in motion. Documentaries and productions that reveal hidden truths and spark conversation.",
    color: "#e85d75",
  },
  {
    id: "social-media",
    category: "SOCIAL MEDIA",
    title: "Digital Presence",
    description: "Authentic engagement across platforms. Building communities that matter and conversations that resonate.",
    color: "#4ecdc4",
  },
] as const;

export const MILESTONES = [
  {
    year: "2016",
    title: "The Foundation",
    description: "First steps into public discourse and intellectual exploration",
  },
  {
    year: "2018",
    title: "Published Voice",
    description: "Debut publication reaches audiences across digital platforms",
  },
  {
    year: "2020",
    title: "Digital Evolution",
    description: "Software development begins, merging technology with vision",
  },
  {
    year: "2022",
    title: "Creative Expansion",
    description: "Music and film projects launch, diversifying the creative portfolio",
  },
  {
    year: "2023",
    title: "For the Next Generation",
    description: "Children's book published, extending influence to young minds",
  },
  {
    year: "2024",
    title: "One Step to Good",
    description: "The intellectual operating system emerges as a unified vision",
  },
] as const;

export const STATS = [
  { value: 50, suffix: "K+", label: "Readers Reached" },
  { value: 12, suffix: "", label: "Publications" },
  { value: 6, suffix: "", label: "Creative Domains" },
] as const;

export const DOMAINS = [
  {
    title: "THINK",
    description: "Academic rigor meets lived experience. Publications and research that challenge conventional narratives.",
    icon: "◆",
    accent: "#c45a32",
  },
  {
    title: "CREATE",
    description: "Music, film, literature, and software. Every medium is a canvas for ideas that matter.",
    icon: "◇",
    accent: "#1d7a8c",
  },
  {
    title: "ACT",
    description: "From thought to action. Building communities, launching initiatives, making tangible impact.",
    icon: "○",
    accent: "#d4a574",
  },
] as const;