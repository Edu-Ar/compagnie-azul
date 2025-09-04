import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),

    defineField({ name: 'title', type: 'string', title: 'Titre', validation: R => R.required() }),
	
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
        // ✅ único por idioma (permite "materia" en FR y en ES)
        isUnique: (value, context) => {
          const {document, getClient} = context
          const lang = document?.language
          const id = (document?._id || '').replace('drafts.', '')
          const query = `
            count(*[
              _type == $type &&
              !(_id in [$id, "drafts." + $id]) &&
              slug.current == $slug &&
              language == $lang
            ]) == 0
          `
          const params = {
            type: document?._type,
            id,
            slug: value?.current || value, // admite value como string u objeto
            lang,
          }
          return getClient({apiVersion: '2025-05-01'}).fetch(query, params)
        },
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'category',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: [
          {title: 'Spectacles', value: 'spectacles'},
          {title: 'Photographie et art-vidéo', value: 'photo-video'},
          {title: 'Médiation', value: 'mediation'},
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    }),

    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Image de couverture',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Texte alternatif' }],
      validation: R => R.required(),
    }),

    defineField({ name: 'videoUrl', type: 'url', title: 'Vidéo (URL)' }),

    // Galería compartida (opcional)
    defineField({
      name: 'galleryRef',
      type: 'reference',
      to: [{type: 'mediaGallery'}],
      title: 'Galerie (compartida)',
      description: 'Usá una galería compartida para FR/ES/EN si querés sincronizar fotos entre idiomas.',
    }),

    // Galería local (permite multi-upload por DnD sobre el array)
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Galerie (local)',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texte alternatif' },
            { name: 'caption', type: 'string', title: 'Légende' },
          ],
        },
      ],
      options: { layout: 'grid' }, // mejora la UX al cargar muchas imágenes
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],

  // Reglas: al menos una galería (ref o local)
  //   validation: (R) =>
  //     R.custom((doc: any) => {
  //       const hasRef = !!doc.galleryRef
  //       const hasLocal = Array.isArray(doc.gallery) && doc.gallery.length > 0
  //       return hasRef || hasLocal || 'Definí "Galerie (compartida)" o "Galerie (local)"'
  //     }),

  preview: {
    select: { title: 'title', media: 'coverImage', lang: 'language', category: 'category' },
    prepare({title, media, lang, category}) {
      return { title, media, subtitle: [lang?.toUpperCase(), category].filter(Boolean).join(' · ') }
    },
  },
})
