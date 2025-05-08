import { IconChartHistogram, IconHome, IconUsers } from '@tabler/icons-react'

import type { IMenuCategory } from './interface'

export const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login'
export const REDIRECT_WHEN_AUTHENTICATED = '/leads'

export const routesCategories: IMenuCategory[] = [
  {
    title: 'Principal',
    type: 'private',
    sortCategory: 1,
    content: [
      {
        label: 'Dashboard',
        icon: IconChartHistogram,
        path: '/dashboard',
        has: 'some',
        permissions: ['view:dashboard'],
        redirect: '/leads',
        sortOrder: 1,
        hiddenMenu: false,
      },
      {
        label: 'Leads',
        icon: IconUsers,
        path: '/leads',
        has: 'some',
        permissions: ['view:dashboard'],
        redirect: REDIRECT_WHEN_NOT_AUTHENTICATED,
        sortOrder: 2,
        hiddenMenu: false,
      },
      {
        title: 'Menu',
        sortOrder: 3,
        icon: IconHome,
        submenus: [
          {
            label: 'Joao',
            path: '/joao',
            has: 'some',
            permissions: ['jonas'],
            redirect: REDIRECT_WHEN_NOT_AUTHENTICATED,
            sortOrder: 1,
            hiddenMenu: false,
          },
          {
            label: 'Joao 2',
            path: '/joao2',
            redirect: REDIRECT_WHEN_NOT_AUTHENTICATED,
            sortOrder: 2,
            hiddenMenu: false,
          },
        ],
      },
    ],
  },

  {
    title: 'Rotas Publicas',
    type: 'public',
    content: [
      {
        label: 'Login',
        path: '/login',
        sortOrder: 1,
        whenAuthenticated: 'redirect',
        redirect: REDIRECT_WHEN_AUTHENTICATED,
      },
    ],
  },
] satisfies IMenuCategory[]
