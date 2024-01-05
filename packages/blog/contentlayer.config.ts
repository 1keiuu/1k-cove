import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLink from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeToc from "rehype-toc";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "タイトル",
      required: true,
    },
    slug: {
      type: "string",
      description: "slug",
      required: true,
    },
    publishedAt: {
      type: "string",
      description: "公開日",
      required: true,
    },
    ogpUrl: {
      type: "string",
      description: "OGP",
      required: true,
    },
    description: {
      type: "string",
      description: "description",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      description: "タグ",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeToc, { headings: "h2" }],
      rehypeCodeTitles,
      rehypePrism,
      rehypeAccessibleEmojis,
      () =>
        rehypeShiftHeading({
          shift: 1,
        }),
      (option) =>
        rehypeAutolinkHeadings({
          ...option,
          behavior: "wrap",
        }),
      (option) =>
        rehypeExternalLink({
          ...option,
          target: "_blank",
        }),
    ],
  },
});
