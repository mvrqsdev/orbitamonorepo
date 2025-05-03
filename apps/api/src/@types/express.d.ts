declare namespace Express {
  export interface Request {
    user: {
      id: string
      status: 'Invited' | 'Active' | 'Inactive'
      master: boolean
      permissions: string[]
    }
  }
}
