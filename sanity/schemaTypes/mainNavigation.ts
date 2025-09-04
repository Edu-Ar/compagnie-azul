import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mainNavigation',
  title: 'Navigation principale',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),
    defineField({
      name: 'items',
      title: 'Éléments',
      type: 'array',
      of: [{ type: 'navItem' }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { lang: 'language' },
    prepare({lang}) {
      return { title: 'Navigation', subtitle: (lang || '').toUpperCase() }
    },
  }
})
