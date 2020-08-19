export default {
    name: "snippet",
    title: "Snippet",
    type: "document",
    fields: [{
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            }
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            name: "body",
            title: "Body",
            type: "block-content"
        }
    ],

    preview: {
        select: {
            title: "title",
            media: "mainImage"
        }
    }
};