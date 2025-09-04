import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),

    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [{type: 'block'}],
    }),
    // Opcional: clasificar la página legal
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Cookies', value: 'cookies'},
          {title: 'Privacidad', value: 'privacy'},
          {title: 'Menciones Legales', value: 'mentions'},
          {title: 'Otro', value: 'other'},
        ],
      },
    }),
  ],
  preview: {
    select: {title: 'title', lang: 'language'},
    prepare({title, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title}
    },
  },
})
