import { validateContract, validatePurchaseOrder, validateInventoryItem } from '../validation';
import type { Contract, PurchaseOrder, InventoryItem } from '../db-schema';
import { mockContracts, mockPurchaseOrders, mockInventory } from '../mock-data';

describe('Backend Validation Tests', () => {
  describe('Contract Validation', () => {
    test('valid contract passes validation', () => {
      const validContract = {
        ...mockContracts[0],
        amount: 50000,
        currency: 'USD',
        start_date: '2025-01-01',
        end_date: '2025-12-31'
      };
      const errors = validateContract(validContract);
      expect(errors).toHaveLength(0);
    });

    test('invalid amount fails validation', () => {
      const invalidContract = {
        ...mockContracts[0],
        amount: -100,
        currency: 'USD',
        start_date: '2025-01-01',
        end_date: '2025-12-31'
      };
      const errors = validateContract(invalidContract);
      expect(errors).toContain('Invalid amount');
    });

    test('invalid currency fails validation', () => {
      const invalidContract = {
        ...mockContracts[0],
        amount: 50000,
        currency: 'INVALID',
        start_date: '2025-01-01',
        end_date: '2025-12-31'
      };
      const errors = validateContract(invalidContract);
      expect(errors).toContain('Invalid currency');
    });

    test('end date before start date fails validation', () => {
      const invalidContract = {
        ...mockContracts[0],
        amount: 50000,
        currency: 'USD',
        start_date: '2025-12-31',
        end_date: '2025-01-01'
      };
      const errors = validateContract(invalidContract);
      expect(errors).toContain('End date must be after start date');
    });
  });

  describe('Purchase Order Validation', () => {
    test('valid purchase order passes validation', () => {
      const validPO = mockPurchaseOrders[0];
      const errors = validatePurchaseOrder(validPO);
      expect(errors).toHaveLength(0);
    });

    test('invalid amount fails validation', () => {
      const invalidPO: PurchaseOrder = {
        ...mockPurchaseOrders[0],
        total_amount: -100,
      };
      const errors = validatePurchaseOrder(invalidPO);
      expect(errors).toContain('Invalid total amount');
    });

    test('delivery date before order date fails validation', () => {
      const invalidPO: PurchaseOrder = {
        ...mockPurchaseOrders[0],
        order_date: '2025-12-31',
        delivery_date: '2025-01-01',
      };
      const errors = validatePurchaseOrder(invalidPO);
      expect(errors).toContain('Delivery date must be after order date');
    });
  });

  describe('Inventory Validation', () => {
    test('valid inventory item passes validation', () => {
      const validItem = mockInventory[0];
      const errors = validateInventoryItem(validItem);
      expect(errors).toHaveLength(0);
    });

    test('invalid quantity fails validation', () => {
      const invalidItem: InventoryItem = {
        ...mockInventory[0],
        quantity: -1,
      };
      const errors = validateInventoryItem(invalidItem);
      expect(errors).toContain('Quantity cannot be negative');
    });

    test('invalid min/max quantity fails validation', () => {
      const invalidItem: InventoryItem = {
        ...mockInventory[0],
        min_quantity: 100,
        max_quantity: 50,
      };
      const errors = validateInventoryItem(invalidItem);
      expect(errors).toContain('Maximum quantity must be greater than minimum quantity');
    });

    test('invalid unit price fails validation', () => {
      const invalidItem: InventoryItem = {
        ...mockInventory[0],
        unit_price: -10,
      };
      const errors = validateInventoryItem(invalidItem);
      expect(errors).toContain('Invalid unit price');
    });
  });
});