import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Spectacles', value: 'spectacles'},
          {title: 'Photographie et art-vidéo', value: 'photo-video'},
          {title: 'Médiation', value: 'mediation'},
        ],
        layout: 'radio',
      },
    }),
	defineField({
	  name: 'collection',
	  title: 'Collection',
	  type: 'reference',
	  to: [{type: 'collection'}],
	  validation: (Rule) => Rule.required(),
	}),

    defineField({
      name: 'synopsis',
      title: 'Sinopsis',
      type: 'array',
      of: [{type: 'block'}], // Portable Text mínimo
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [{type: 'image'}],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'credit',
          fields: [
            defineField({name: 'role', title: 'Rol', type: 'string'}),
            defineField({
              name: 'person',
              title: 'Persona',
              type: 'reference',
              to: [{type: 'person'}],
            }),
            defineField({name: 'notes', title: 'Notas', type: 'string'}),
          ],
          preview: {
            select: {title: 'role', subtitle: 'person.name'},
          },
        },
      ],
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'heroImage', subtitle: 'category', lang: 'language'},
    prepare({title, media, subtitle, lang}) {
      const L = (lang || '').toUpperCase()
      const t = L ? `[${L}] ${title}` : title
      return {title: t, media, subtitle}
    },
  },
})
