"use client"

import { useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

interface ErrorBoundaryProps {
  error: Error
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const { t } = useLanguage()

  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight">{t("errorOccurred")}</h2>
        <p className="text-muted-foreground">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {t("tryAgain")}
        </button>
      </div>
    </div>
  )
}