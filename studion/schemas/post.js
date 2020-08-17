export default {
  name: "post",
  title: "Post",
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
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      title: "Body",
      type: "block-content",
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "datetime",
    },
  ],
  orderings: [
    {
      title: "Release Date, New",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
    {
      title: "Release Date, Old",
      name: "releaseDateAsc",
      by: [{ field: "releaseDate", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare(selection) {
      const { title } = selection;
      return Object.assign({}, selection, {
        subtitle: title && `by ${title}`,
      });
    },
  },
};
