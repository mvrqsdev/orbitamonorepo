import { Request } from 'express'
import IORedis from 'ioredis'
import { UAParser } from 'ua-parser-js'

export function getDeviceInfo(agent: string) {
  const parser = new UAParser(agent)
  const result = parser.getResult()

  const device = result.device.type || 'desktop'
  const browserName = result.browser.name
  const osName = result.os.name

  if (!browserName || !osName || !device) {
    return 'Dispositivo Desconhecido'
  }

  const browserVersion = result.browser.version || ''
  const osVersion = result.os.version || ''

  const browser = `${browserName} ${browserVersion}`.trim()
  const os = `${osName} ${osVersion}`.trim()

  return `${device.charAt(0).toUpperCase() + device.slice(1).toLocaleLowerCase()} - ${os} - ${browser}`
}

export const redis = new IORedis(
  process.env.REDIS_URI || 'redis://localhost:6379',
  {
    maxRetriesPerRequest: null,
  },
)

export const rateLimiter = async (
  ip: string,
): Promise<{
  limit: number
  remaining: number
  success: boolean
}> => {
  const key = `rate_limit:${ip}`
  const currentCount = await redis.get(key)
  const count = parseInt(currentCount as string, 10) || 0
  if (count >= 10) {
    return { limit: 10, remaining: 10 - count, success: false }
  }
  await redis.incr(key)
  await redis.expire(key, 10)
  return { limit: 10, remaining: 10 - (count + 1), success: true }
}

export const getClientIp = (req: Request): string => {
  // 1. Extrai x-forwarded-for com type safety

  // 3. Tenta req.ip (com verificação de string)
  if (typeof req.ip === 'string' && req.ip.trim() !== '') {
    return req.ip.replace(/^::ffff:/, '')
  }

  // 4. Fallback para socket.remoteAddress (com verificação)
  const socketIp = req.socket?.remoteAddress
  if (typeof socketIp === 'string' && socketIp.trim() !== '') {
    return socketIp.replace(/^::ffff:/, '')
  }

  // 5. Se nenhum IP válido foi encontrado
  throw new Error('Não foi possível determinar o IP do cliente')
}
