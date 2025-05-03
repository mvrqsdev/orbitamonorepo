'use client'

import { TooltipProvider } from '@orbita/ui/components/tooltip'
import { ReactNode } from 'react'

import { ThemeProvider } from '@/providers/theme-provider'
import { TRPCProvider } from '@/trpc/client'

import { SearchProvider } from './search-provider'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <TRPCProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SearchProvider>{children}</SearchProvider>
        </TooltipProvider>
      </ThemeProvider>
    </TRPCProvider>
  )
}
