import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),

    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orgType',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Compañía', value: 'company'},
          {title: 'Festival', value: 'festival'},
          {title: 'Museo / Centro', value: 'museum'},
          {title: 'Representación', value: 'representation'},
          {title: 'Partner', value: 'partner'},
          {title: 'Otro', value: 'other'},
        ],
      },
    }),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'siteUrl', title: 'Sitio web', type: 'url'}),
    defineField({name: 'notes', title: 'Notas', type: 'text'}),
  ],
  preview: {
    select: {title: 'name', media: 'logo', subtitle: 'orgType', lang: 'language'},
    prepare({title, media, subtitle, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, media, subtitle}
    },
  },
})
