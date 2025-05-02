import { Prisma } from '../generated/client'

export const ConstructionCompanyBase =
  Prisma.validator<Prisma.ConstructionCompanySelect>()({
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    _count: true,
  })

export const ConstructionCompanySelect =
  Prisma.validator<Prisma.ConstructionCompanySelect>()({
    ...ConstructionCompanyBase,
    Contacts: {
      select: {
        id: true,
        constructionCompanyId: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    Projects: {
      select: {
        id: true,
        constructionId: true,
        title: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        _count: true,
        Campaigns: {
          select: {
            id: true,
            projectId: true,
            sourceId: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            _count: true,
            Source: {
              select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                _count: true,
              },
            },
          },
        },
      },
    },
  })
