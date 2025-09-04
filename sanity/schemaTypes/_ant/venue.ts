import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),

    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'address', title: 'Dirección', type: 'string'}),
    defineField({name: 'city', title: 'Ciudad', type: 'string'}),
    defineField({name: 'country', title: 'País', type: 'string'}),
    defineField({name: 'siteUrl', title: 'Sitio web', type: 'url'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'city', lang: 'language'},
    prepare({title, subtitle, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, subtitle}
    },
  },
})
