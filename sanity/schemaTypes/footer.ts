import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),
    defineField({
      name: 'note',
      title: 'Texte du pied',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: { lang: 'language' },
    prepare({lang}) {
      return { title: 'Footer', subtitle: (lang || '').toUpperCase() }
    },
  }
})
