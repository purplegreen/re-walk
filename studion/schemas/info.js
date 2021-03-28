export default {
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "body",
      title: "Body",
      type: "block-content",
    },
  ],

  preview: {
    select: {
      title: "title",
    },
  },
};
