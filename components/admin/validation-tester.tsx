import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { runValidationTests, type ValidationTestResult } from '@/lib/validation-tests'
import { useLanguage } from '@/lib/language-context'

export function ValidationTester() {
  const { t } = useLanguage()
  const [results, setResults] = useState<ValidationTestResult[]>([])

  const runTests = () => {
    const testResults = runValidationTests()
    setResults(testResults)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('validationTester')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runTests} className="mb-4">
          {t('runTests')}
        </Button>

        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.passed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}
              >
                <h3 className="font-medium mb-2">
                  {result.passed ? '✓' : '✗'} {result.description}
                </h3>
                {!result.passed && result.errors.length > 0 && (
                  <ul className="list-disc list-inside">
                    {result.errors.map((error: string, errorIndex: number) => (
                      <li key={errorIndex}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">{t('testSummary')}</h3>
              <p>
                {t('totalTests')}: {results.length}
                <br />
                {t('passedTests')}: {results.filter((r) => r.passed).length}
                <br />
                {t('failedTests')}: {results.filter((r) => !r.passed).length}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}