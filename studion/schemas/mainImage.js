export default {
  name: "mainImage",
  title: "Main Image",
  type: "image",
  fields: [{
    title: "Caption",
    name: "caption",
    type: "string",
    options: {
      isHighlighted: true,
    },
  }, ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};