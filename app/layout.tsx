import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS App - Modern Solutions for Your Business",
  description: "Transform your business with our cutting-edge SaaS platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
