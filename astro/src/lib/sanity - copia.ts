import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '8e0a2c0p',   // 👈 cambia esto
  dataset: 'production',
  apiVersion: '2025-08-26',       // fecha fija, puede ser la actual
  useCdn: true,                   // usa CDN para respuestas rápidas
  token: import.meta.env.SANITY_READ_TOKEN, // 👈 usamos variable de entorno

})
