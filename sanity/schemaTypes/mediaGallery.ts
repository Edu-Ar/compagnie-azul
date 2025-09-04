import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaGallery',
  title: 'Galería (compartida)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Título', validation: R => R.required() }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            { name: 'alt', type: 'string', title: 'Alt' },
            { name: 'caption', type: 'string', title: 'Leyenda' },
            { name: 'credit', type: 'string', title: 'Crédito (opcional)' },
          ],
        },
      ],
      validation: R => R.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'images.0' },
  },
})
