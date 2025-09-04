import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homeHero',
  title: 'Inicio (Hero)',
  type: 'document',
  fields: [
    defineField({ name: 'language', type: 'string', hidden: true, readOnly: true }),
    defineField({ name: 'title', type: 'string', title: 'Título interno' }),
    defineField({ name: 'imgSpectacles', type: 'image', title: 'Imagen — Spectacles', options:{hotspot:true} }),
    defineField({ name: 'imgPhotoVideo', type: 'image', title: 'Imagen — Photo & vidéo', options:{hotspot:true} }),
    defineField({ name: 'imgMediation',  type: 'image', title: 'Imagen — Médiation',    options:{hotspot:true} }),
    defineField({ name: 'labelSpectacles', type: 'string', title: 'Rótulo Spectacles' }),
    defineField({ name: 'labelPhotoVideo', type: 'string', title: 'Rótulo Photo & vidéo' }),
    defineField({ name: 'labelMediation',  type: 'string', title: 'Rótulo Médiation' }),
  ],
})
