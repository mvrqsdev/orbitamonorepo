import { Prisma } from '../generated/client'

export const ScheduleBase = Prisma.validator<Prisma.ScheduleDefaultArgs>()({
  select: {
    id: true,
    userId: true,
    leadId: true,
    date: true,
    status: true,
    address: true,
    nextNotificationAt: true,
    createdAt: true,
    updatedAt: true,
  },
})

export type Schedule = Prisma.ScheduleGetPayload<typeof ScheduleBase>
