/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IconBuilding,
  IconChartHistogram,
  IconLungs,
  IconUsers,
} from '@tabler/icons-react'

import {
  BaseNavItem,
  type NavCollapsible,
  type NavGroup,
  type NavItem,
} from './types'

export function getSidebarData(): NavGroup[] {
  const sidebarData: NavGroup[] = [
    {
      title: 'Principal',
      menus: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: IconChartHistogram,
        },
      ],
    },
    {
      title: 'Leads',
      menus: [
        {
          title: 'Kanban',
          icon: IconUsers,
          url: '#',
        },
        {
          title: 'Compromissos',
          icon: IconBuilding,
          url: '#',
        },
        {
          title: 'Gestão',
          icon: IconUsers,
          submenu: [
            {
              title: 'Usuários',
              url: '#',
              role: ['Admin', 'Manager'],
            },
          ],
        },
      ],
    },
    {
      title: 'Gestão',
      menus: [
        {
          title: 'Usuários',
          icon: IconUsers,
          submenu: [
            {
              title: 'Todos os Usuários',
              url: '#',
              role: ['Admin', 'Manager'],
            },
          ],
        },
      ],
    },
  ]

  // Função para filtrar os submenus
  return sidebarData
}
