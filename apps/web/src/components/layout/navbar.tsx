'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@orbita/ui/components/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@orbita/ui/components/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@orbita/ui/components/sidebar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useIsMobile } from '@/hooks/use-mobile'
import { isCollapsible } from '@/routes/functions'
import type {
  IMenuCategory,
  IMenuCollapsible,
  IPrivateRoute,
  TMenuContent,
} from '@/routes/interface'

function checkIsActive(href: string, item: TMenuContent, mainNav = false) {
  if (isCollapsible(item)) {
    return !!item.submenus.filter((route) => route.path === href).length
  }

  return (
    item.path === href ||
    item.path === href.split('?')[0] ||
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item.path.split('/')[1])
  )
}

export function SidebarMenuCategory({ title, content }: IMenuCategory) {
  const { state } = useSidebar()
  const href = usePathname()
  const isMobile = useIsMobile()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {content.map((item, index) => {
          if (isMobile) {
            if (!('submenus' in item)) {
              const route = item as IPrivateRoute
              const key = `${route.label}-${route.path}-${index}`
              return <SidebarMenuRoute href={href} route={route} key={key} />
            }
            const key = `${item.title}-${item.sortOrder}-${index}`
            return <SidebarMenuCollapsible key={key} item={item} href={href} />
          }

          if (!('submenus' in item)) {
            const route = item as IPrivateRoute
            const key = `${route.label}-${route.path}-${index}`
            return <SidebarMenuRoute href={href} route={route} key={key} />
          }

          const key = `${item.title}-${item.sortOrder}-${index}`
          if (state === 'collapsed') {
            return (
              <SidebarMenuCollapsibleDropdown
                key={key}
                href={href}
                item={item}
              />
            )
          }

          return <SidebarMenuCollapsible key={key} item={item} href={href} />
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
export interface ISidebarMenuRoute {
  route: IPrivateRoute
  href: string
}
export function SidebarMenuRoute({ href, route }: ISidebarMenuRoute) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, route)}
        tooltip={route.label}
      >
        <Link href={route.path ?? '#'} onClick={() => setOpenMobile(false)}>
          {route.icon && <route.icon />}
          <span>{route.label}</span>
          {/* {route.badge && <NavBadge>{item.badge}</NavBadge>} */}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export interface ISidebarMenuCollapsible {
  item: IMenuCollapsible
  href: string
}

export function SidebarMenuCollapsible({
  item,
  href,
}: ISidebarMenuCollapsible) {
  const { setOpenMobile } = useSidebar()

  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.submenus.map((subItem) => (
              <SidebarMenuSubItem key={subItem.label}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}
                >
                  <Link
                    href={subItem.path}
                    onClick={() => setOpenMobile(false)}
                  >
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export interface ISidebarMenuCollapsibleDropdown {
  item: IMenuCollapsible
  href: string
}

export function SidebarMenuCollapsibleDropdown({
  href,
  item,
}: ISidebarMenuCollapsibleDropdown) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.submenus.map((sub) => (
            <DropdownMenuItem key={`${sub.label}-${sub.path}`} asChild>
              <Link
                href={sub.path}
                className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}
              >
                {sub.icon && <sub.icon />}
                <span className="max-w-52 text-wrap">{sub.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
