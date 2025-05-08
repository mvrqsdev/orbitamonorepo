'use client'

import { TooltipProvider } from '@orbita/ui/components/tooltip'
import { ReactNode } from 'react'

import { ThemeProvider } from '@/providers/theme-provider'
import { TRPCCLient } from '@/trpc/client'

import { SearchProvider } from './search-provider'
import { SessionProvider } from './session-provider'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <TRPCCLient>
      <SessionProvider>
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
      </SessionProvider>
    </TRPCCLient>
  )
}
