import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
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
      name: 'eventType',
      title: 'Tipo de evento',
      type: 'string',
      options: {
        list: [
          {title: 'Función', value: 'performance'},
          {title: 'Taller', value: 'workshop'},
          {title: 'Exposición', value: 'exhibition'},
          {title: 'Otro', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Inicio',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'endDate', title: 'Fin', type: 'datetime'}),
    defineField({
      name: 'venue',
      title: 'Sala / Espacio',
      type: 'reference',
      to: [{type: 'venue'}],
    }),
    defineField({name: 'city', title: 'Ciudad', type: 'string'}),
    defineField({name: 'country', title: 'País', type: 'string'}),
    defineField({name: 'ticketUrl', title: 'Entradas (URL)', type: 'url'}),
    defineField({
      name: 'notes',
      title: 'Notas',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'city', lang: 'language'},
    prepare({title, subtitle, lang}) {
      const L = (lang || '').toUpperCase()
      return {title: L ? `[${L}] ${title}` : title, subtitle}
    },
  },
})
