import { Category } from './category';

export type PostCategories = {
  postId: string;
  categories: Category[];
  slugs?: string[];
};
