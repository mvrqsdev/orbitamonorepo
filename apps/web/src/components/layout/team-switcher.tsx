'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@orbita/ui/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@orbita/ui/components/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@orbita/ui/components/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@orbita/ui/components/tooltip'
import { ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'

export function TeamSwitcher() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={undefined} alt="" />
                    <AvatarFallback className="rounded-lg">TE</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className=" flex flex-col"
                >
                  <span>Pedro Marques</span>
                </TooltipContent>
              </Tooltip>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Pedro Marques</span>
                <span className="truncate text-xs">mvrqs.dev@gmail.com</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Empresas
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => console.log('oi')}
              className="gap-2 p-2 truncate"
            >
              <div className="flex aspect-square size-7 items-center justify-center rounded-sm border border-input bg-white p-0.5"></div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Teste</span>
                <span className="truncate text-xs">cnpj</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Novo Cliente
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
