export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GEL"] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

// Currency validation
export function isValidCurrency(currency: string): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency);
}

// Amount validation
export function isValidAmount(amount: number): boolean {
  return !isNaN(amount) && isFinite(amount) && amount >= 0;
}

// Date validation
export function isValidDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

// Entity validation functions
export function validateContract(contract: any): string[] {
  const errors: string[] = [];

  if (!isValidAmount(contract.amount)) {
    errors.push("Invalid amount");
  }

  if (!isValidCurrency(contract.currency)) {
    errors.push("Invalid currency");
  }

  if (!isValidDate(contract.start_date)) {
    errors.push("Invalid start date");
  }

  if (!isValidDate(contract.end_date)) {
    errors.push("Invalid end date");
  }

  // Compare dates
  if (new Date(contract.end_date) <= new Date(contract.start_date)) {
    errors.push("End date must be after start date");
  }

  return errors;
}

export function validatePurchaseOrder(po: any): string[] {
  const errors: string[] = [];

  if (!isValidAmount(po.total_amount)) {
    errors.push("Invalid total amount");
  }

  if (!isValidCurrency(po.currency)) {
    errors.push("Invalid currency");
  }

  if (!isValidDate(po.order_date)) {
    errors.push("Invalid order date");
  }

  if (!isValidDate(po.delivery_date)) {
    errors.push("Invalid delivery date");
  }

  if (new Date(po.delivery_date) <= new Date(po.order_date)) {
    errors.push("Delivery date must be after order date");
  }

  return errors;
}

export function validateSalesOrder(order: any): string[] {
  const errors: string[] = [];

  if (!isValidAmount(order.total_amount)) {
    errors.push("Invalid total amount");
  }

  if (!isValidCurrency(order.currency)) {
    errors.push("Invalid currency");
  }

  if (!isValidDate(order.order_date)) {
    errors.push("Invalid order date");
  }

  if (!isValidDate(order.delivery_date)) {
    errors.push("Invalid delivery date");
  }

  if (new Date(order.delivery_date) <= new Date(order.order_date)) {
    errors.push("Delivery date must be after order date");
  }

  return errors;
}

export function validateInventoryItem(item: any): string[] {
  const errors: string[] = [];

  if (!isValidAmount(item.unit_price)) {
    errors.push("Invalid unit price");
  }

  if (item.quantity < 0) {
    errors.push("Quantity cannot be negative");
  }

  if (item.min_quantity < 0) {
    errors.push("Minimum quantity cannot be negative");
  }

  if (item.max_quantity <= item.min_quantity) {
    errors.push("Maximum quantity must be greater than minimum quantity");
  }

  if (item.expiry_date && !isValidDate(item.expiry_date)) {
    errors.push("Invalid expiry date");
  }

  return errors;
}

export class ValidationError extends Error {
  constructor(public errors: string[]) {
    super(errors.join(", "));
    this.name = "ValidationError";
  }
}

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};