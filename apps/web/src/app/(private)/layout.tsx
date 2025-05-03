import { SidebarProvider } from '@orbita/ui/components/sidebar'
import { cookies } from 'next/headers'

import { AppSidebar } from '@/components/layout/app-sidebar'
import { cn } from '@/lib/utils'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookiesStore = await cookies()
  const defaultOpen = cookiesStore.get('sidebar_state')?.value

  return (
    <SidebarProvider defaultOpen={defaultOpen === 'true'}>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'transition-[width] duration-200 ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh',
        )}
      >
        {children}
      </div>
      {/* <GlobalSheets /> */}
    </SidebarProvider>
  )
}
