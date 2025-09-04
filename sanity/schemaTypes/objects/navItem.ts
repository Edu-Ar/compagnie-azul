import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Nav item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etiqueta', type: 'string', validation: R => R.required() }),
    defineField({ name: 'path',  title: 'Ruta interna (p. ej., /presse)', type: 'string' }),
    defineField({ name: 'href',  title: 'Enlace externo', type: 'url' }),
  ],
  validation: (R) => R.custom((v) => (v?.path || v?.href) ? true : 'Definí "path" o "href"'),
})
