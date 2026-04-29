import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'isTall',
      title: 'Tall desktop height (744px vs 699px)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', media: 'image' } },
})
