import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),
    defineField({ name: 'title', type: 'string', title: 'Titre', validation: R => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', lang: 'language' },
    prepare({title, lang}) {
      return { title, subtitle: (lang || '').toUpperCase() }
    },
  }
})

