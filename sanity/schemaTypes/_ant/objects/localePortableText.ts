import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'localePortableText',
  title: 'Multilenguaje (Portable Text)',
  type: 'object',
  fields: [
    defineField({
      name: 'fr', title: 'Français', type: 'array', of: [{type: 'block'}],
    }),
    defineField({
      name: 'es', title: 'Español', type: 'array', of: [{type: 'block'}],
    }),
    defineField({
      name: 'en', title: 'English', type: 'array', of: [{type: 'block'}],
    }),
  ],
})
