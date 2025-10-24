"use client"

import { type ReactNode, useRef } from "react"
import { useDataStore } from "@/lib/data-store"

export function StoreProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    initialized.current = true
    // Initialize store here if needed
  }

  return <>{children}</>
}