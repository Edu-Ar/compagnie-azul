// src/lib/getSettings.ts
import groq from 'groq'
import { sanity } from './sanity'

const q = groq`{
  "settings": coalesce(
    *[_type=="siteSettings" && language==$lang][0]{siteTitle, social, contactEmail},
    *[_type=="siteSettings" && language=="fr"][0]{siteTitle, social, contactEmail}
  ),
  "nav": coalesce(
    *[_type=="mainNavigation" && language==$lang][0]{ items },
    *[_type=="mainNavigation" && language=="fr"][0]{ items }
  ),
  "footer": coalesce(
    *[_type=="footer" && language==$lang][0]{ note },
    *[_type=="footer" && language=="fr"][0]{ note }
  )
}`

export async function getSettings(lang: 'fr'|'es'|'en') {
  return sanity.fetch(q, { lang })
}
