export type Post = {
  docId: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  ogpUrl: string;
  imageUrls: string[];
};

export type LinkCard = { src: string; title: string; imgSrc: string };
