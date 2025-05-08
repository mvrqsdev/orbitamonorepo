'use client'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@orbita/ui/components/command'
import { ScrollArea } from '@orbita/ui/components/scroll-area'
import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import React from 'react'

import { useSearch } from '@/providers/search-provider'
import { routesCategories } from '@/routes'
import { getSortedPrivateMenu } from '@/routes/functions'

export function CommandMenu() {
  const navigate = useRouter()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen],
  )

  const menu = getSortedPrivateMenu(routesCategories, ['view:dashboard'])

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Escreva um comando ou pesquise..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
          {menu &&
            menu.map((group) => {
              if (group.content.length > 0) {
                return (
                  <CommandGroup
                    key={`${group.title}-${group.type}`}
                    heading={group.title}
                  >
                    {group.content.map((navItem, i) => {
                      if (!('submenus' in navItem)) {
                        return (
                          <CommandItem
                            key={`${navItem.path}-${i}`}
                            value={navItem.label}
                            className="cursor-pointer"
                            onSelect={() => {
                              runCommand(() => {
                                if (navItem.path) {
                                  navigate.push(navItem.path ?? '#')
                                }
                              })
                            }}
                          >
                            <div className="mr-2 flex h-4 w-4 items-center justify-center">
                              <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                            </div>
                            {navItem.label}
                          </CommandItem>
                        )
                      }

                      return navItem.submenus.map((subItem, i) => (
                        <CommandItem
                          key={`${subItem.path}-${i}`}
                          value={subItem.label}
                          className="cursor-pointer"
                          onSelect={() => {
                            runCommand(() => navigate.push(subItem.path))
                          }}
                        >
                          <div className="mr-2 flex h-4 w-4 items-center justify-center">
                            <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                          </div>
                          {subItem.label}
                        </CommandItem>
                      ))
                    })}
                  </CommandGroup>
                )
              }
              return null
            })}

          <CommandSeparator />
          <CommandGroup heading="Tema">
            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme('light'))}
            >
              <IconSun /> <span>Claro</span>
            </CommandItem>
            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme('dark'))}
            >
              <IconMoon className="scale-90" />
              <span>Escuro</span>
            </CommandItem>
            <CommandItem
              className="cursor-pointer"
              onSelect={() => runCommand(() => setTheme('system'))}
            >
              <IconDeviceLaptop />
              <span>Sistema</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
