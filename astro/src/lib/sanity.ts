import {createClient} from '@sanity/client'

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: import.meta.env.SANITY_API_VERSION, // fija y estable
  token: import.meta.env.SANITY_READ_TOKEN,       // solo server
  useCdn: false,                                  // autenticado → API en vivo
  perspective: 'published',                       // solo contenido publicado
})

