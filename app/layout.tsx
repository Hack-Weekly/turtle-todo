import "./globals.css"

export const metadata = {
  title: 'Turtle Todo',
  description: 'Turtle Todo',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
