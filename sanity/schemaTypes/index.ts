// schemaTypes/index.ts — minimal y consistente con i18n por documento

import project from './project'
import pressItem from './pressItem'
import legalPage from './legalPage'
import siteSettings from './siteSettings'
import mainNavigation from './mainNavigation'
import footer from './footer'
import mediaGallery from './mediaGallery'
import homeHero from './homeHero'
import navItem from './objects/navItem'

// Exporta SOLO lo que usamos ahora
export const schemaTypes = [
  project,
  homeHero,
  pressItem,
  legalPage,
  siteSettings,
  mainNavigation,
  footer,
  mediaGallery,

  // objetos
  navItem,
]
