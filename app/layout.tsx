import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
export const metadata = {
  title: "Turtle Todo",
  description: "Turtle Todo",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
