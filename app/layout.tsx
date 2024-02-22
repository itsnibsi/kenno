import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";

const fontSans = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <div className='p-8'>
          <h1 className='text-2xl font-bold mb-4'>Kenno</h1>
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
