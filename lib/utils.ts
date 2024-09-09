import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMarvelAuthorization = () => {
  const ts = 1
  const publicApiKey = process.env.MARVEL_PUBLIC_API_KEY
  const privateApiKey = process.env.MARVEL_PRIVATE_API_KEY
  const marvelBaseUrl = process.env.MARVEL_BASE_URL

  const hash = crypto.createHash('md5').update(`${ts}${privateApiKey}${publicApiKey}`).digest("hex")

  return { ts, hash, publicApiKey, marvelBaseUrl }
}