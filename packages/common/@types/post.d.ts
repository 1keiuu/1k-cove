export type Post = {
  docId: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  date: string;
  ogpUrl: string;
  imageUrls: string[];
  isPublic: boolean;
};

export type LinkCard = {
  src: string;
  title: string;
  imgSrc: string;
  description: string;
};
