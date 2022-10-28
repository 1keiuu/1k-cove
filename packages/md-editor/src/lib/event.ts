export type InsertImageEvent = CustomEvent<{ url: string }>;
const insertImageEvent: InsertImageEvent = new CustomEvent('insertImage', {
  detail: {
    url: 'https://avatars.githubusercontent.com/u/46051957?v=4',
  },
});

export { insertImageEvent };
