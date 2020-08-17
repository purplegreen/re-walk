export default {
  name: "mainImage",
  title: "Main image",
  type: "image",
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};
