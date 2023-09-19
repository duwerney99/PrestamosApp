import { Providers } from '@redux/provider'
import '@styles/tailwind.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
            <head>
                <head>
                    <link rel="shortcut icon" href="/public/vuce.png"/> 
                    <title>VUCE</title>
                </head>
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
  )
}
