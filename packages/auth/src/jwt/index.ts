export type JWT = {
  id: string
  status: 'Invited' | 'Active' | 'Inactive'
  master: boolean
  permissions: string[]
  exp: number
}
