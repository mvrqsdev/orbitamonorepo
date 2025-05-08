'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@orbita/ui/components/sidebar'

// import { useMemo } from 'react'
// import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { routesCategories } from '@/routes/'
import { getSortedPrivateMenu } from '@/routes/functions'

import { SidebarMenuCategory } from './navbar'
// import { getSidebarData } from './sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const menus = useMemo(() => getSidebarData(), [])
  const menus = getSortedPrivateMenu(routesCategories, ['view:dashboard'])
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {menus &&
          menus.map((props, index) => {
            if (props.content.length > 0) {
              return (
                <SidebarMenuCategory
                  key={`${props.title}-${props.type}-${props.sortCategory}-${index}`}
                  {...props}
                />
              )
            }
            return null
          })}
        {/* {menus &&
          menus.map((props, index) => {
            if (props.menus.length > 0) {
              return <NavGroup key={`${props.menus}-${index}`} {...props} />
            }
            return null
          })} */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
