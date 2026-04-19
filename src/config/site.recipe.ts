import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'visual',
  themePack: 'visual-portfolio',
  homepageTemplate: 'image-profile-home',
  navbarTemplate: 'compact-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'image',
  enabledTasks: ['image', 'profile'],
  taskTemplates: { image: 'image-portfolio', profile: 'profile-creator' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
