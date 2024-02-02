import { Providers } from '@redux/provider'
import '@styles/tailwind.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
            <head>
                <head>
                    <link rel="shortcut icon" href="/public/prestamo.png"/> 
                    <title>Prestamos App</title>
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
