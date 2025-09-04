import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mainNavigation',
  title: 'Main Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Ítems',
      type: 'array',
      of: [{type: 'navItem'}],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
