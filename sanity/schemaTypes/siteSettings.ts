import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),

    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Titre du site',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo (optionnel)',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Texte alternatif'}],
    }),

    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'facebook',  type: 'url', title: 'Facebook'},
        {name: 'youtube',   type: 'url', title: 'YouTube'},
        {name: 'vimeo',     type: 'url', title: 'Vimeo'},
        {name: 'tiktok',    type: 'url', title: 'TikTok'},
      ],
    }),

    defineField({ name: 'contactEmail', type: 'string', title: 'Email de contact' }),
    defineField({ name: 'contactPhone', type: 'string', title: 'Téléphone (optionnel)' }),
  ],
  preview: {
    select: { title: 'siteTitle', media: 'logo', lang: 'language' },
    prepare({title, media, lang}) {
      return { title: title || 'Réglages', media, subtitle: (lang || '').toUpperCase() }
    },
  }
})
