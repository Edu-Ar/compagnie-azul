import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array',
      of: [{type: 'block'}], // Portable Text mínimo
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'name', media: 'photo', lang: 'language'},
    prepare({title, media, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, media}
    },
  },
})
