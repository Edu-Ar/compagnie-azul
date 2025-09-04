import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Título del sitio', type: 'localeString'}),
    defineField({name: 'tagline', title: 'Lema', type: 'localeString'}),
    defineField({
      name: 'socialLinks',
      title: 'Redes',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'link',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {select: {title: 'label.fr'}},
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'description', title: 'Description', type: 'localeText'}),
        defineField({name: 'ogImage', title: 'OG Image', type: 'image', options: {hotspot: true}}),
      ],
    }),
    defineField({
      name: 'availableLanguages',
      title: 'Idiomas disponibles',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['fr', 'es', 'en'],
    }),
  ],
  preview: {select: {title: 'siteTitle.fr'}},
})
