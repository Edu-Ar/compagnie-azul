import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pressItem',
  title: 'Presse',
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
    defineField({ name: 'date', type: 'date', title: 'Date', options: { dateFormat: 'YYYY-MM-DD' }, validation: R => R.required() }),
    defineField({ name: 'outlet', type: 'string', title: 'Média' }),
    defineField({ name: 'url', type: 'url', title: 'Lien (si en ligne)' }),
    defineField({ name: 'file', type: 'file', title: 'PDF (optionnel)' }),
    defineField({ name: 'excerpt', type: 'text', title: 'Extrait' }),
  ],
  preview: {
    select: { title: 'title', lang: 'language', outlet: 'outlet', date: 'date' },
    prepare({title, lang, outlet, date}) {
      return { title, subtitle: [lang?.toUpperCase(), outlet, date].filter(Boolean).join(' · ') }
    },
  },
})
