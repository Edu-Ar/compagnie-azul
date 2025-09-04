// ./structure.ts
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // Projets (todos)
      S.listItem()
        .title('Projets (tous)')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projets')),

      // Categorías
      S.listItem()
        .title('Spectacles')
        .schemaType('project')
        .child(
          S.documentList()
            .title('Spectacles')
            .filter('_type == "project" && category == $cat')
            .params({cat: 'spectacles'})
        ),

      S.listItem()
        .title('Photographie et art-vidéo')
        .schemaType('project')
        .child(
          S.documentList()
            .title('Photographie et art-vidéo')
            .filter('_type == "project" && category == $cat')
            .params({cat: 'photo-video'})
        ),

      S.listItem()
        .title('Médiation')
        .schemaType('project')
        .child(
          S.documentList()
            .title('Médiation')
            .filter('_type == "project" && category == $cat')
            .params({cat: 'mediation'})
        ),

      S.divider(),

      // Resto de tipos que usás
      S.documentTypeListItem('pressItem').title('Presse'),
      S.documentTypeListItem('legalPage').title('Pages'),
      S.documentTypeListItem('siteSettings').title('Réglages du site'),
      S.documentTypeListItem('mainNavigation').title('Navigation principale'),
      S.documentTypeListItem('footer').title('Pied de page'),

      // Mantener visible la metadata de traducciones
      S.documentTypeListItem('translation.metadata').title('Translation metadata'),

      // (Opcional) Añadir cualquier otro tipo no listado arriba
      ...S.documentTypeListItems().filter((li) =>
        !['project','pressItem','legalPage','siteSettings','mainNavigation','footer','translation.metadata']
          .includes(li.getId?.() as string)
      ),
    ])
