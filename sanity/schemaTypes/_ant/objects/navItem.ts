import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Etiqueta', type: 'localeString'}),

    defineField({
      name: 'linkType',
      title: 'Tipo de enlace',
      type: 'string',
      options: {
        list: [
          {title: 'Interno (referencia)', value: 'internal'},
          {title: 'Externo (URL)', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),

    // Interno: referencia a documentos navegables
    defineField({
      name: 'internalRef',
      title: 'Destino interno',
      type: 'reference',
      to: [
        {type: 'project'},
        {type: 'collection'},
        {type: 'pressItem'},
        {type: 'legalPage'},
        {type: 'person'},
        // agrega otros si corresponde
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),

    // Externo: URL
    defineField({
      name: 'externalUrl',
      title: 'URL externa',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((v) => {
          if (!v) return true
          // http(s) o mailto
          if (/^https?:\/\/.+/i.test(v) || /^mailto:.+@.+\..+$/i.test(v)) return true
          // tel: (permite espacios, guiones y paréntesis; valida que haya dígitos)
          if (/^tel:\+?[0-9()\-\s]+$/i.test(v)) return true
          return 'Usa http(s), mailto: o tel: (ej. tel:+5491122334455)'
        }),
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),

    // Anidamiento opcional (submenú)
    defineField({
      name: 'children',
      title: 'Sub-ítems',
      type: 'array',
      of: [{type: 'navItem'}],
    }),

    defineField({
      name: 'newTab',
      title: 'Abrir en nueva pestaña',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label.fr'},
    prepare({title}) {
      return {title: title || '(sin etiqueta)'}
    },
  },
})
