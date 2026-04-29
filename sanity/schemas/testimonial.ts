import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Company Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'logoMobile', title: 'Company Logo (Mobile)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: { select: { title: 'name' } },
})
