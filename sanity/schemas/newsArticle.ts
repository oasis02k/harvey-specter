import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'desktopOffset',
      title: 'Desktop offset (shifts card down 120px)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'desc', media: 'image' } },
})
