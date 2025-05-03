import type { DefaultSession, User as DefaultUser } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    permissions?: string[]
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string
      name: string
      email: string
      image: string
      permissions: string[]
      accessToken?: string
      status: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    sub: string
    name: string
    email: string
    image: string
    permissions: string[]
    accessToken?: string
    status: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    sub: string
    name: string
    email: string
    image: string
    permissions: string[]
    status: string
  }
}
