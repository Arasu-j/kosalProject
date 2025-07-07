import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexProviderWrapper from './ConvexProvider'
import { SessionProvider } from './SessionProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "College-Company Connect",
  description: "A platform connecting colleges and companies for student placements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexProviderWrapper>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}
