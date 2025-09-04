import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'localeText',
  title: 'Multilenguaje (Text)',
  type: 'object',
  fields: [
    defineField({name: 'fr', title: 'Français', type: 'text'}),
    defineField({name: 'es', title: 'Español', type: 'text'}),
    defineField({name: 'en', title: 'English', type: 'text'}),
  ],
})
