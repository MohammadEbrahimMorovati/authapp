import './globals.scss'
import Providers from './providers'

export const metadata = {
  title: 'Auth Demo',
  description: 'Minimal Next.js auth flow with TS + SCSS Modules'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}