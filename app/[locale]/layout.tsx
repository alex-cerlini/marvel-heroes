import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Link from "next/link";
import marvelLogo from "@/assets/Marvel_Logo.svg";
import Image from "next/image";
import { Providers } from "@/components/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Marvel Heroes",
  description: "An app to navigate on your fav heroes!",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh flex flex-col items-center justify-between gap-y-8 lg:gap-y-4`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="mt-8 mb-2 w-[100svw] flex pl-8 md:ml-0 md:justify-center">
            <Image
              src={marvelLogo}
              alt="Marvel logo"
              className="max-w-32 md:max-w-48"
            />
          </div>
          <Providers>{children}</Providers>
          <footer className="text-xs mb-2">
            <Link href="http://marvel.com" target="_blank">
              Data provided by Marvel. © 2024 MARVEL
            </Link>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
