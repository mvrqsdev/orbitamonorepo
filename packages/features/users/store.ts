import type { User } from '@orbita/prisma'
import { create } from 'zustand'

interface IUserStore {
  user: User | null
  permissions: string[]
  setUser: (user: User) => void
  setPermissions: (permissions: string[]) => void
  removeUser: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  permissions: [],
  setUser(user) {
    set(() => ({ user }))
  },
  setPermissions(permissions) {
    set(() => ({ permissions }))
  },
  removeUser() {
    set(() => ({
      user: null,
      permissions: [],
    }))
  },
}))
