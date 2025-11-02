import { validateContract, validatePurchaseOrder, validateSalesOrder, validateInventoryItem } from './validation';
import { mockContracts, mockPurchaseOrders, mockSalesOrders, mockInventory } from './mock-data';
import type { Contract, PurchaseOrder, SalesOrder, InventoryItem } from './db-schema';

export interface ValidationTestResult {
  passed: boolean;
  description: string;
  errors: string[];
}

function runTest(description: string, testFn: () => string[]): ValidationTestResult {
  const errors = testFn();
  return {
    passed: errors.length === 0,
    description,
    errors,
  };
}

export function runValidationTests() {
  const results: ValidationTestResult[] = [];

  // Contract Validation Tests
  results.push(
    runTest('Valid contract passes validation', () => {
      const validContract = mockContracts[0];
      return validateContract(validContract);
    })
  );

  results.push(
    runTest('Invalid amount fails validation', () => {
      const invalidContract: Contract = {
        ...mockContracts[0],
        amount: -100,
      };
      return validateContract(invalidContract);
    })
  );

  results.push(
    runTest('Invalid currency fails validation', () => {
      const invalidContract: Contract = {
        ...mockContracts[0],
        currency: 'INVALID' as any,
      };
      return validateContract(invalidContract);
    })
  );

  // Purchase Order Validation Tests
  results.push(
    runTest('Valid purchase order passes validation', () => {
      const validPO = mockPurchaseOrders[0];
      return validatePurchaseOrder(validPO);
    })
  );

  results.push(
    runTest('Invalid PO amount fails validation', () => {
      const invalidPO: PurchaseOrder = {
        ...mockPurchaseOrders[0],
        total_amount: -1,
      };
      return validatePurchaseOrder(invalidPO);
    })
  );

  // Inventory Item Validation Tests
  results.push(
    runTest('Valid inventory item passes validation', () => {
      const validItem = mockInventory[0];
      return validateInventoryItem(validItem);
    })
  );

  results.push(
    runTest('Invalid quantity fails validation', () => {
      const invalidItem: InventoryItem = {
        ...mockInventory[0],
        quantity: -1,
      };
      return validateInventoryItem(invalidItem);
    })
  );

  return results;
}

// Utility function to print test results
export function printValidationTestResults(results: ValidationTestResult[]) {
  console.log('\n=== Validation Test Results ===\n');
  
  let passed = 0;
  let failed = 0;

  results.forEach((result, index) => {
    console.log(`Test ${index + 1}: ${result.description}`);
    console.log(`Status: ${result.passed ? '✓ PASSED' : '✗ FAILED'}`);
    
    if (!result.passed) {
      console.log('Errors:');
      result.errors.forEach(error => console.log(` - ${error}`));
    }
    
    console.log('---');

    if (result.passed) passed++;
    else failed++;
  });

  console.log(`\nSummary:`);
  console.log(`Total Tests: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('\n============================\n');
}