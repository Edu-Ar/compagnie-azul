import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'localeString',
  title: 'Multilenguaje (String)',
  type: 'object',
  fields: [
    defineField({name: 'fr', title: 'Français', type: 'string'}),
    defineField({name: 'es', title: 'Español', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
  ],
})
