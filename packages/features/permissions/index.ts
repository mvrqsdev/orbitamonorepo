import type { Permission } from '@orbita/prisma'
import { prisma } from '@orbita/prisma'

export async function FindPermissionsByUserId(
  userId: string,
): Promise<{ permissions: Permission[] }> {
  const permissions = await prisma.permission.findMany({
    where: {
      Users: {
        some: {
          userId,
        },
      },
    },
  })

  if (!permissions) {
    throw new Error('Nenhuma permissão encontrada para este usuário.')
  }

  return {
    permissions,
  }
}
