import { ReactNode } from 'react'

export interface IUserProvider {
  children: ReactNode
}

export async function UserProvider({ children }: IUserProvider) {
  return <h1>{children}</h1>
}
