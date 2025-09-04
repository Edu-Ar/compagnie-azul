import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
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
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'coverImage', title: 'Imagen de portada', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Orden', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', lang: 'language'},
    prepare({title, media, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, media}
    },
  },
})
