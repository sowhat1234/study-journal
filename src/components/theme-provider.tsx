"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes/dist/types" // This import path might be wrong or internal. next-themes exports it directly usually?
// Actually next-themes doesn't export ThemeProviderProps in v0.3?
// Let's check imports. usually just React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
