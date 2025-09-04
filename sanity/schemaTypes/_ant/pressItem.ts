import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pressItem',
  title: 'Press Item',
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
    defineField({name: 'publication', title: 'Medio / Publicación', type: 'string'}),
    defineField({name: 'date', title: 'Fecha', type: 'date'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'pdfAsset', title: 'PDF', type: 'file'}),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'array',
      of: [{type: 'block'}], // Portable Text
    }),
    defineField({name: 'quote', title: 'Cita destacada', type: 'text'}),
    defineField({
      name: 'relatedProject',
      title: 'Proyecto relacionado',
      type: 'reference',
      to: [{type: 'project'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'publication', lang: 'language'},
    prepare({title, subtitle, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, subtitle}
    },
  },
})
