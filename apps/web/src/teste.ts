import { auth } from '@orbita/auth/middleware'

export default auth((req) => {
  const teste = req.auth?.user?.permissions
  console.log(req.cookies.get('session_token'))
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
