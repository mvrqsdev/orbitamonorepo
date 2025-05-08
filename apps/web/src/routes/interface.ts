import { ElementType } from 'react'

export interface IPrivateRoute {
  label: string
  icon?: ElementType
  path: string
  permissions?: string[]
  has?: 'some' | 'every'
  redirect?: string
  sortOrder: number
  hiddenMenu: boolean
}

export interface IPublicRoute {
  label: string
  icon?: ElementType
  path: string
  whenAuthenticated?: 'redirect' | 'hasPermission'
  redirect?: string
  has?: 'some' | 'every'
  permissions?: string[]
}

export type TMenuItem = IPrivateRoute | IPublicRoute

export interface IMenuCollapsible {
  title: string
  sortOrder: number
  icon?: ElementType
  submenus: TMenuItem[]
}
export type TMenuContent = TMenuItem | IMenuCollapsible

export interface IMenuCategory {
  title: string
  type: 'private' | 'public'
  sortCategory?: number
  content: TMenuContent[]
}
