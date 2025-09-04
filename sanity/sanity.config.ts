// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
// import {presentationTool} from 'sanity/presentation' // <- opcional (visual editing)

import {schemaTypes} from './schemaTypes'

const supportedLanguages = [
  {id: 'fr', title: '[FR]'},
  {id: 'es', title: '[ES]'},
  {id: 'en', title: '[EN]'},
]

export default defineConfig({
  name: 'compagnie-azul-studio',
  title: 'Compagnie Azul',
  projectId: '8e0a2c0p',
  dataset: 'compagnie-azul',
  // basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Contenu').items([
          S.listItem().title('Projets (tous)').schemaType('project')
            .child(S.documentTypeList('project').title('Projets')),

          S.listItem().title('Spectacles').schemaType('project').child(
            S.documentList().title('Spectacles')
              .filter('_type == "project" && category == $cat')
              .params({cat:'spectacles'})
          ),

          S.listItem().title('Photographie & art-vidéo').schemaType('project').child(
            S.documentList().title('Photographie & art-vidéo')
              .filter('_type == "project" && category == $cat')
              .params({cat:'photo-video'})
          ),

          S.listItem().title('Médiation').schemaType('project').child(
            S.documentList().title('Médiation')
              .filter('_type == "project" && category == $cat')
              .params({cat:'mediation'})
          ),

          S.divider(),

          S.documentTypeListItem('pressItem').title('Presse'),
          S.documentTypeListItem('legalPage').title('Pages'),
          S.documentTypeListItem('siteSettings').title('Ajustes del sitio'),

          // Dejá visibles si querés gestionarlos desde Sanity:
          S.documentTypeListItem('mainNavigation').title('Menú principal'),
          S.documentTypeListItem('footer').title('Pie de página'),

          // Hero de la landing por idioma:
          S.documentTypeListItem('homeHero').title('Inicio (Hero)'),

          // Excluimos tipos internos/duplicados del spread:
          ...S.documentTypeListItems().filter((li) =>
            ![
              'project','pressItem','legalPage','siteSettings',
              'mainNavigation','footer','homeHero','translation.metadata'
            ].includes(li.getId?.() as string)
          ),
        ]),
    }),

    visionTool(),

    documentInternationalization({
      supportedLanguages,
      schemaTypes: [
        'project','pressItem','legalPage','siteSettings',
        'mainNavigation','footer','homeHero'
      ],
      languageField: 'language',
      weakReferences: true,
      allowCreateMetaDoc: true,
    }),

    // presentationTool({  // <- opcional: activalo si querés Visual Editing
    //   previewUrl: {
    //     origin: 'http://localhost:4321', // tu astro dev
    //     previewMode: {enable: '/api/preview/enable'} // si configurás modo preview
    //   },
    //   resolve: { locations: {/* mapeo doc -> ruta del sitio */} }
    // }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Ocultamos plantillas “sin idioma” para los tipos i18n (solo creás FR y luego traducís):
  document: {
    newDocumentOptions: (prev) => {
      const i18nTypes = [
        'project','pressItem','legalPage','siteSettings',
        'mainNavigation','footer','homeHero'
      ]
      return prev.filter((tpl) =>
        !(i18nTypes.includes(tpl.schemaType) && tpl.templateId === tpl.schemaType)
      )
    },
  },
})
