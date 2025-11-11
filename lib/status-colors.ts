/**
 * Status color and style utilities for consistent UI across the application
 */

export type StatusVariant = 
  // Contracts and Purchase Orders
  | "draft" | "created" | "active" | "approved" | "completed" | "terminated" 
  | "purchased" | "received" | "paid" | "cancelled"
  // Legal Entities
  | "inactive" | "suspended"
  // Regulations
  | "pending"
  // Inventory
  | "in-stock" | "low-stock" | "out-of-stock" | "overstock"

interface StatusColorConfig {
  variant: "default" | "secondary" | "destructive" | "outline";
  bgColor: string;
  textColor: string;
  borderColor?: string;
}

const statusColorMap: Record<StatusVariant, StatusColorConfig> = {
  // Draft and created states - light gray
  draft: {
    variant: "secondary",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    borderColor: "border-gray-300",
  },
  created: {
    variant: "secondary",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
    borderColor: "border-gray-300",
  },

  // Active states - green
  active: {
    variant: "default",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
    borderColor: "border-green-300",
  },
  approved: {
    variant: "default",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
    borderColor: "border-green-300",
  },

  // Completed states - dark emerald/teal
  completed: {
    variant: "default",
    bgColor: "bg-teal-100",
    textColor: "text-teal-900",
    borderColor: "border-teal-300",
  },

  // Pending states - amber/yellow
  pending: {
    variant: "outline",
    bgColor: "bg-amber-100",
    textColor: "text-amber-900",
    borderColor: "border-amber-300",
  },

  // Processing states - blue and purple
  purchased: {
    variant: "outline",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
    borderColor: "border-blue-300",
  },
  received: {
    variant: "outline",
    bgColor: "bg-purple-100",
    textColor: "text-purple-900",
    borderColor: "border-purple-300",
  },

  // Paid state - cyan
  paid: {
    variant: "default",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-900",
    borderColor: "border-cyan-300",
  },

  // Error/Warning states - red
  terminated: {
    variant: "destructive",
    bgColor: "bg-red-100",
    textColor: "text-red-900",
    borderColor: "border-red-300",
  },
  cancelled: {
    variant: "destructive",
    bgColor: "bg-red-100",
    textColor: "text-red-900",
    borderColor: "border-red-300",
  },

  // Inactive states - slate
  inactive: {
    variant: "secondary",
    bgColor: "bg-slate-100",
    textColor: "text-slate-900",
    borderColor: "border-slate-300",
  },

  // Suspended/Problem states - orange
  suspended: {
    variant: "outline",
    bgColor: "bg-orange-100",
    textColor: "text-orange-900",
    borderColor: "border-orange-300",
  },

  // Inventory states
  "in-stock": {
    variant: "default",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
    borderColor: "border-green-300",
  },
  "low-stock": {
    variant: "outline",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-900",
    borderColor: "border-yellow-300",
  },
  "out-of-stock": {
    variant: "destructive",
    bgColor: "bg-red-100",
    textColor: "text-red-900",
    borderColor: "border-red-300",
  },
  overstock: {
    variant: "outline",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-900",
    borderColor: "border-indigo-300",
  },
};

/**
 * Get the badge configuration for a status
 */
export function getStatusConfig(status: string): StatusColorConfig {
  return statusColorMap[status as StatusVariant] || statusColorMap.draft;
}

/**
 * Get badge variant for a status
 */
export function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  return getStatusConfig(status).variant;
}

/**
 * Get tailwind classes for a status badge
 */
export function getStatusBadgeClasses(status: string): string {
  const config = getStatusConfig(status);
  return `${config.bgColor} ${config.textColor} border border-gray-200`;
}

/**
 * Get tailwind classes for residency badge
 */
export function getResidencyBadgeClasses(isResident: boolean): string {
  if (isResident) {
    return "bg-blue-100 text-blue-900 border border-gray-200";
  }
  return "bg-pink-100 text-pink-900 border border-gray-200";
}
