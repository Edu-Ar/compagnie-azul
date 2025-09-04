import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columnas',
      type: 'array',
      of: [
        defineField({
          name: 'column',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'localeString'}),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{type: 'navItem'}],
            }),
          ],
          preview: {select: {title: 'title.fr'}},
        }),
      ],
    }),
    defineField({
      name: 'legal',
      title: 'Legales',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'localeString',
    }),
  ],
})
