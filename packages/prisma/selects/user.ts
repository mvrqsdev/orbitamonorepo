import { Prisma } from '../generated/client'
import { LeadBase, LeadCommentBase, LeadDocumentBase } from './lead'

export const UserBase = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  image: true,
  name: true,
  email: true,
  master: true,
  chatwootAgentId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  _count: true,
})

export const User = Prisma.validator<Prisma.UserSelect>()({
  ...UserBase,
  LeadComments: {
    select: {
      ...LeadCommentBase,
      Lead: {
        select: LeadBase,
      },
    },
  },
  LeadDocuments: {
    select: {
      ...LeadDocumentBase,
      Lead: {
        select: LeadBase,
      },
    },
  },
  Schedules: {
    select: {
      Lead: {
        select: LeadBase,
      },
      Participants: {
        select: {
          Participant: {
            select: UserBase,
          },
        },
      },
      User: {
        select: UserBase,
      },
    },
  },
})
