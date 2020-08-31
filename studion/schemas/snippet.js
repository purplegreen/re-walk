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
            }
        },
        {
            name: 'audio',
            title: 'Audio',
            description: 'Meditation Audio',
            type: 'file'
        },
        {
            name: "duration",
            title: "Duration",
            description: 'In Number',
            type: 'number'
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
        },
        {
            name: "location",
            title: "Location",
            description: 'example -> lat: 52.523737, lng: 13.402282',
            type: 'slug'
        },
        {
            name: "alreadyPlayedInSeconds",
            title: "Played",
            description: 'should be 0',
            type: 'number'
        },
        {
            name: "isHighlighted",
            title: "Highlighted",
            description: 'Leave it off',
            type: 'boolean'
        },

    ],

    preview: {
        select: {
            title: "title",
            media: "mainImage"
        }
    }
};