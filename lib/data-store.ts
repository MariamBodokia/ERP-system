"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  Contract,
  PurchaseOrder,
  Supplier,
  InventoryItem,
  Warehouse,
  SalesOrder,
  Customer,
  AccountingEntry,
} from "./db-schema"
import { validateContract, validatePurchaseOrder, validateSalesOrder, validateInventoryItem, ValidationError } from "./validation"

interface Movement {
  id: string
  item_id: string
  from_warehouse_id: string
  to_warehouse_id: string
  quantity: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

interface InventoryCheck {
  id: string
  checkNumber: string
  warehouse_id: string
  date: string
  status: "completed" | "in-progress"
  itemsChecked: number
  discrepancies: number
}
import {
  mockContracts,
  mockPurchaseOrders,
  mockSuppliers,
  mockInventory,
  mockWarehouses,
  mockSalesOrders,
  mockCustomers,
  mockAccountingEntries,
} from "./mock-data"

interface DataStore {
  contracts: Contract[]
  purchaseOrders: PurchaseOrder[]
  suppliers: Supplier[]
  inventory: InventoryItem[]
  warehouses: Warehouse[]
  salesOrders: SalesOrder[]
  customers: Customer[]
  accountingEntries: AccountingEntry[]
  movements: Movement[]

  // Contract actions
  addContract: (contract: Contract) => void
  updateContract: (id: string, contract: Partial<Contract>) => void
  deleteContract: (id: string) => void

  // Purchase Order actions
  addPurchaseOrder: (po: PurchaseOrder) => void
  updatePurchaseOrder: (id: string, po: Partial<PurchaseOrder>) => void
  deletePurchaseOrder: (id: string) => void

  // Supplier actions
  addSupplier: (supplier: Supplier) => void
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void
  deleteSupplier: (id: string) => void

  // Inventory actions
  addInventoryItem: (item: InventoryItem) => void
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void
  deleteInventoryItem: (id: string) => void

  // Warehouse actions
  addWarehouse: (warehouse: Warehouse) => void
  updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void
  deleteWarehouse: (id: string) => void

  // Sales Order actions
  addSalesOrder: (order: SalesOrder) => void
  updateSalesOrder: (id: string, order: Partial<SalesOrder>) => void
  deleteSalesOrder: (id: string) => void

  // Customer actions
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void

  // Accounting Entry actions
  addAccountingEntry: (entry: AccountingEntry) => void
  updateAccountingEntry: (id: string, entry: Partial<AccountingEntry>) => void
  deleteAccountingEntry: (id: string) => void

  // Movement actions
  addMovement: (movement: Movement) => void
  updateMovement: (id: string, movement: Partial<Movement>) => void
  deleteMovement: (id: string) => void

  // Inventory Check actions
  inventoryChecks: InventoryCheck[]
  addInventoryCheck: (check: InventoryCheck) => void
  updateInventoryCheck: (id: string, check: Partial<InventoryCheck>) => void
  deleteInventoryCheck: (id: string) => void
}

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      contracts: mockContracts,
      purchaseOrders: mockPurchaseOrders,
      suppliers: mockSuppliers,
      inventory: mockInventory,
      warehouses: mockWarehouses,
      salesOrders: mockSalesOrders,
      customers: mockCustomers,
      accountingEntries: mockAccountingEntries,

      // Contract actions
      addContract: (contract) => {
        const errors = validateContract(contract);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        set((state) => ({ contracts: [...state.contracts, contract] }));
      },
      updateContract: (id, contract) => set((state) => {
        const existingContract = state.contracts.find((c: Contract) => c.id === id);
        if (!existingContract) {
          throw new Error("Contract not found");
        }
        const mergedContract = { ...existingContract, ...contract };
        const errors = validateContract(mergedContract);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        return {
          contracts: state.contracts.map((c: Contract) => (c.id === id ? mergedContract : c)),
        };
      }),
      deleteContract: (id) => set((state) => {
        const existingContract = state.contracts.find((c: Contract) => c.id === id);
        if (!existingContract) {
          throw new Error("Contract not found");
        }
        return { 
          contracts: state.contracts.filter((c: Contract) => c.id !== id) 
        };
      }),

      // Purchase Order actions
      addPurchaseOrder: (po) => {
        const errors = validatePurchaseOrder(po);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        set((state) => ({ purchaseOrders: [...state.purchaseOrders, po] }));
      },
      updatePurchaseOrder: (id, po) => set((state) => {
        const existingPO = state.purchaseOrders.find((p: PurchaseOrder) => p.id === id);
        if (!existingPO) {
          throw new Error("Purchase order not found");
        }
        const mergedPO = { ...existingPO, ...po };
        const errors = validatePurchaseOrder(mergedPO);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        return {
          purchaseOrders: state.purchaseOrders.map((p: PurchaseOrder) => 
            p.id === id ? mergedPO : p
          ),
        };
      }),
      deletePurchaseOrder: (id) => set((state) => {
        const existingPO = state.purchaseOrders.find((p: PurchaseOrder) => p.id === id);
        if (!existingPO) {
          throw new Error("Purchase order not found");
        }
        return { 
          purchaseOrders: state.purchaseOrders.filter((p: PurchaseOrder) => p.id !== id)
        };
      }),

      // Supplier actions
      addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
      updateSupplier: (id, supplier) =>
        set((state) => ({
          suppliers: state.suppliers.map((s) => (s.id === id ? { ...s, ...supplier } : s)),
        })),
      deleteSupplier: (id) => set((state) => ({ suppliers: state.suppliers.filter((s) => s.id !== id) })),

      // Inventory actions
      addInventoryItem: (item) => {
        const errors = validateInventoryItem(item);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        set((state) => ({ inventory: [...state.inventory, item] }));
      },
      updateInventoryItem: (id, item) => set((state) => {
        const existingItem = state.inventory.find((i: InventoryItem) => i.id === id);
        if (!existingItem) {
          throw new Error("Inventory item not found");
        }
        const mergedItem = { ...existingItem, ...item };
        const errors = validateInventoryItem(mergedItem);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        return {
          inventory: state.inventory.map((i: InventoryItem) => 
            i.id === id ? mergedItem : i
          ),
        };
      }),
      deleteInventoryItem: (id) => set((state) => {
        const existingItem = state.inventory.find((i: InventoryItem) => i.id === id);
        if (!existingItem) {
          throw new Error("Inventory item not found");
        }
        return { 
          inventory: state.inventory.filter((i: InventoryItem) => i.id !== id)
        };
      }),

      // Warehouse actions
      addWarehouse: (warehouse) => set((state) => ({ warehouses: [...state.warehouses, warehouse] })),
      updateWarehouse: (id, warehouse) =>
        set((state) => ({
          warehouses: state.warehouses.map((w) => (w.id === id ? { ...w, ...warehouse } : w)),
        })),
      deleteWarehouse: (id) => set((state) => ({ warehouses: state.warehouses.filter((w) => w.id !== id) })),

      // Sales Order actions
      addSalesOrder: (order) => {
        const errors = validateSalesOrder(order);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        set((state) => ({ salesOrders: [...state.salesOrders, order] }));
      },
      updateSalesOrder: (id, order) => set((state) => {
        const existingOrder = state.salesOrders.find((o: SalesOrder) => o.id === id);
        if (!existingOrder) {
          throw new Error("Sales order not found");
        }
        const mergedOrder = { ...existingOrder, ...order };
        const errors = validateSalesOrder(mergedOrder);
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        return {
          salesOrders: state.salesOrders.map((o: SalesOrder) => (o.id === id ? mergedOrder : o)),
        };
      }),
      deleteSalesOrder: (id) => set((state) => {
        const existingOrder = state.salesOrders.find((o: SalesOrder) => o.id === id);
        if (!existingOrder) {
          throw new Error("Sales order not found");
        }
        return { 
          salesOrders: state.salesOrders.filter((o: SalesOrder) => o.id !== id) 
        };
      }),

      // Customer actions
      addCustomer: (customer) => set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, customer) =>
        set((state) => ({
          customers: state.customers.map((c) => (c.id === id ? { ...c, ...customer } : c)),
        })),
      deleteCustomer: (id) => set((state) => ({ customers: state.customers.filter((c) => c.id !== id) })),

      // Accounting Entry actions
      addAccountingEntry: (entry) => set((state) => ({ accountingEntries: [...state.accountingEntries, entry] })),
      updateAccountingEntry: (id, entry) =>
        set((state) => ({
          accountingEntries: state.accountingEntries.map((e) => (e.id === id ? { ...e, ...entry } : e)),
        })),
      deleteAccountingEntry: (id) =>
        set((state) => ({
          accountingEntries: state.accountingEntries.filter((e) => e.id !== id),
        })),

      // Movements
      movements: [],
      addMovement: (movement) => set((state) => ({ movements: [...state.movements, movement] })),
      updateMovement: (id, movement) =>
        set((state) => ({
          movements: state.movements.map((m) => (m.id === id ? { ...m, ...movement } : m)),
        })),
      deleteMovement: (id) => set((state) => ({ movements: state.movements.filter((m) => m.id !== id) })),

      // Inventory Checks
      inventoryChecks: [],
      addInventoryCheck: (check) => set((state) => ({ inventoryChecks: [...state.inventoryChecks, check] })),
      updateInventoryCheck: (id, check) =>
        set((state) => ({
          inventoryChecks: state.inventoryChecks.map((c) => (c.id === id ? { ...c, ...check } : c)),
        })),
      deleteInventoryCheck: (id) =>
        set((state) => ({ inventoryChecks: state.inventoryChecks.filter((c) => c.id !== id) })),
    }),
    {
      name: "erp-data-storage",
    },
  ),
)
