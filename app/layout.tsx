import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "sonner";
import { StateProvider } from "@/providers/shared-state-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedOut>
            <div className="flex flex-col h-full w-full justify-center items-center p-4 gap-4">
              <p className="font-mono">Please login to continue</p>
              <div className="flex gap-x-2">
                <SignInButton mode="modal">
                  <button className="w-20 hover:bg-white/10 cursor-pointer p-2 rounded-sm transition">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-black w-20 text-white hover:bg-white/90 dark:bg-white dark:text-black cursor-pointer p-2 rounded-sm transition">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <StateProvider>
              {children}
              <ModalProvider />
              <Toaster position="bottom-center" />
            </StateProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
