// deskStructure.ts
import type {StructureResolver} from 'sanity/desk'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Singletons ──────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.listItem()
        .title('Main Navigation')
        .child(
          S.editor()
            .id('mainNavigation')
            .schemaType('mainNavigation')
            .documentId('mainNavigation')
        ),

      S.listItem()
        .title('Footer')
        .child(
          S.editor()
            .id('footer')
            .schemaType('footer')
            .documentId('footer')
        ),

      S.divider(),

      // ── Resto de tipos (excluimos los singletons para que no dupliquen) ──
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return !['siteSettings', 'mainNavigation', 'footer'].includes(String(id))
      }),
    ])
