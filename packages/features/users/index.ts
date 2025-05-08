import dayjs from '@orbita/dayjs'
import { prisma, User, UserBase } from '@orbita/prisma'
import bcrypt from 'bcryptjs'

import { FindSessionById } from '../session'
export type { UserStatus } from '@orbita/prisma'

type CreateUserData = Omit<
  User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'lastActiveAt'
  | 'online'
  | 'image'
  | 'password'
> & {
  password?: string
}

export async function CreateUser(
  user: CreateUserData,
): Promise<{ user: Omit<User, 'password'> }> {
  const { name, email } = user

  if (!name) {
    throw new Error('O nome é obrigatório')
  }

  if (!email) {
    throw new Error('O Email é obrigatório')
  }

  const fetchUserByEmail = await FindUserByEmail(email)

  if (fetchUserByEmail) {
    throw new Error('Usuário já existe no banco de dados')
  }

  const password = user.password
    ? await bcrypt.hash(user.password, 10)
    : undefined

  const createUser = await prisma.user.create({
    data: {
      ...user,
      password,
    },
    select: {
      ...UserBase.select,
      password: false,
    },
  })

  return {
    user: createUser,
  }
}

export async function FindUserById(id: string): Promise<{ user: User }> {
  const user = await prisma.user.findUnique({
    ...UserBase,
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado.')
  }

  return {
    user,
  }
}

export async function FindUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    ...UserBase,
    where: {
      email,
    },
  })

  if (!user) {
    return null
  }

  return user
}

export async function FindUserBySessionId(
  sessionId: string,
): Promise<{ user: Omit<User, 'password'> }> {
  const fetchSession = await FindSessionById(sessionId)

  if (!fetchSession) {
    throw new Error('Não foi possível obter o usuário. Sessão não encontrada.')
  }

  const user = await prisma.user.findFirst({
    select: {
      ...UserBase.select,
      password: false,
    },
    where: {
      Sessions: {
        some: {
          id: sessionId,
        },
      },
    },
  })

  if (!user) {
    throw new Error('Usuário não encontrado.')
  }

  return {
    user,
  }
}

export async function UpdateLastActiveAtUserById(
  id: string,
): Promise<{ user: User }> {
  const fetchUser = await FindUserById(id)

  if (!fetchUser) {
    throw new Error('Nenhum usuário encontrado com este ID.')
  }
  const lastActiveAt = dayjs().toDate()
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      lastActiveAt,
    },
  })

  return {
    user,
  }
}

// export async function UpdateUser({
//   user,
// }: {
//   user: Partial<Omit<User, 'createdAt' | 'updatedAt' | 'lastActiveAt'>> & {
//     id: string
//   }
// }): Promise<{ user: Omit<User, 'password'> }> {
//   const { id, ...rest } = user
//   await FindUserById(id)
//   const password = rest.password
//     ? await bcrypt.hash(rest.password, 10)
//     : undefined
//   const updatedUser = await prisma.user.update({
//     select: {
//       ...UserBase.select,
//       password: false,
//     },
//     where: {
//       id,
//     },
//     data: {
//       ...rest,
//       password,
//     },
//   })
//   return {
//     user: updatedUser,
//   }
// }
