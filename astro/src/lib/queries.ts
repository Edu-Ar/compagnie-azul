import groq from 'groq'

// Menú principal (resuelve URL por idioma, con fallback)
export const NAV_QUERY = groq`
*[_id == "mainNavigation"][0]{
  "items": items[]{
    "label": select(
      $lang == "fr" => label.fr,
      $lang == "es" => label.es,
      $lang == "en" => label.en
    ),
    "url": select(
      linkType == "external" => externalUrl,
      (linkType == "internal" && defined(internalRef)) =>
        "/" +
        coalesce(
          *[_type == "translation.metadata" && references(internalRef->_id)][0]
            .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].lang,
          internalRef->language
        )
        + "/" +
        coalesce(
          *[_type == "translation.metadata" && references(internalRef->_id)][0]
            .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].slug,
          internalRef->slug.current
        )
    ),
    "children": children[]{
      "label": select(
        $lang == "fr" => label.fr,
        $lang == "es" => label.es,
        $lang == "en" => label.en
      ),
      "url": select(
        linkType == "external" => externalUrl,
        (linkType == "internal" && defined(internalRef)) =>
          "/" +
          coalesce(
            *[_type == "translation.metadata" && references(internalRef->_id)][0]
              .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].lang,
            internalRef->language
          )
          + "/" +
          coalesce(
            *[_type == "translation.metadata" && references(internalRef->_id)][0]
              .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].slug,
            internalRef->slug.current
          )
      )
    }
  }
}
`

// Footer por idioma (mismo patrón)
export const FOOTER_QUERY = groq`
*[_id == "footer"][0]{
  "columns": columns[]{
    "title": select(
      $lang == "fr" => title.fr,
      $lang == "es" => title.es,
      $lang == "en" => title.en
    ),
    "links": links[]{
      "label": select(
        $lang == "fr" => label.fr,
        $lang == "es" => label.es,
        $lang == "en" => label.en
      ),
      "url": select(
        linkType == "external" => externalUrl,
        (linkType == "internal" && defined(internalRef)) =>
          "/" +
          coalesce(
            *[_type == "translation.metadata" && references(internalRef->_id)][0]
              .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].lang,
            internalRef->language
          )
          + "/" +
          coalesce(
            *[_type == "translation.metadata" && references(internalRef->_id)][0]
              .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].slug,
            internalRef->slug.current
          )
      )
    }
  },
  "legal": legal[]{
    "label": select(
      $lang == "fr" => label.fr,
      $lang == "es" => label.es,
      $lang == "en" => label.en
    ),
    "url": select(
      linkType == "external" => externalUrl,
      (linkType == "internal" && defined(internalRef)) =>
        "/" +
        coalesce(
          *[_type == "translation.metadata" && references(internalRef->_id)][0]
            .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].lang,
          internalRef->language
        )
        + "/" +
        coalesce(
          *[_type == "translation.metadata" && references(internalRef->_id)][0]
            .translations[]{ value->{"lang": language, "slug": slug.current} }[lang == $lang][0].slug,
          internalRef->slug.current
        )
    )
  }
}
`
