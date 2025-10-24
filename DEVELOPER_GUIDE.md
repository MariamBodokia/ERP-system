# ERP System - Developer Guide

## Project Overview

This is a comprehensive Enterprise Resource Planning (ERP) system built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The system includes 9 major modules covering all aspects of business operations.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persistence
- **Database**: Currently using local storage (can be migrated to Supabase/Neon)

### Project Structure

\`\`\`
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page with module cards
│   ├── admin/                    # Admin panel for data management
│   ├── legal/                    # Legal/Contract management module
│   ├── procurement/              # Procurement module
│   ├── warehouse/                # Warehouse management module
│   ├── accounting/               # Accounting module
│   ├── production/               # Production module
│   ├── sales/                    # Sales module
│   ├── finance/                  # Finance module
│   ├── hr/                       # HR module
│   └── managerial/               # Managerial accounting module
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin panel components
│   ├── language-switcher.tsx    # Language toggle component
│   └── module-layout.tsx        # Shared layout for modules
├── lib/                          # Utility functions and configurations
│   ├── db-schema.ts             # TypeScript interfaces for data models
│   ├── mock-data.ts             # Initial mock data
│   ├── data-store.ts            # Zustand store for state management
│   ├── translations.ts          # Multi-language translations
│   └── language-context.tsx     # Language context provider
└── DATABASE_SETUP.md            # Database setup instructions
\`\`\`

## Data Management

### Current Implementation (Local Storage)

The system currently uses **Zustand** with **localStorage persistence** for data management. This means:

- All data is stored in the browser's localStorage
- Data persists across page refreshes
- Data is isolated per browser/device
- No backend server required for demo purposes

### Data Store Location

All data management logic is in `lib/data-store.ts`. This file contains:

- State definitions for all entities
- CRUD operations (Create, Read, Update, Delete)
- Automatic persistence to localStorage

### Modifying Data Programmatically

#### 1. Using the Admin Panel (Recommended for Non-Developers)

Navigate to `/admin` to access the admin panel where you can:
- Add new records
- Edit existing records
- Delete records
- View all data in tables

#### 2. Modifying Data in Code

To add or modify data programmatically, edit `lib/mock-data.ts`:

\`\`\`typescript
// Example: Adding a new contract
export const mockContracts: Contract[] = [
  {
    id: "3",  // Must be unique
    contract_number: "CNT-2025-003",
    title: "New Service Agreement",
    type: "service",
    status: "active",
    party_buyer: "Client Company",
    party_seller: "Our Company",
    amount: 75000,
    currency: "USD",
    start_date: "2025-02-01",
    end_date: "2025-12-31",
    payment_terms: "Net 45",
    created_by: "admin",
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-02-01T10:00:00Z",
  },
  // ... existing contracts
]
\`\`\`

#### 3. Using the Data Store Hooks

In any component, you can use the Zustand hooks:

\`\`\`typescript
import { useDataStore } from "@/lib/data-store"

function MyComponent() {
  const { contracts, addContract, updateContract, deleteContract } = useDataStore()
  
  // Add a new contract
  const handleAdd = () => {
    addContract({
      id: Date.now().toString(),
      contract_number: "CNT-2025-004",
      // ... other fields
    })
  }
  
  // Update a contract
  const handleUpdate = (id: string) => {
    updateContract(id, {
      status: "expired"
    })
  }
  
  // Delete a contract
  const handleDelete = (id: string) => {
    deleteContract(id)
  }
  
  return (
    // Your component JSX
  )
}
\`\`\`

## Migrating to a Real Database

### Option 1: Supabase (Recommended)

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the SQL schema** from `DATABASE_SETUP.md` in the Supabase SQL editor

3. **Install Supabase client**:
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

4. **Create Supabase client** (`lib/supabase.ts`):
\`\`\`typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
\`\`\`

5. **Replace Zustand store** with Supabase queries:
\`\`\`typescript
// Instead of:
const { contracts } = useDataStore()

// Use:
const [contracts, setContracts] = useState([])

useEffect(() => {
  async function fetchContracts() {
    const { data } = await supabase.from('contracts').select('*')
    setContracts(data)
  }
  fetchContracts()
}, [])
\`\`\`

### Option 2: Neon (PostgreSQL)

1. **Create a Neon project** at [neon.tech](https://neon.tech)

2. **Install Neon client**:
\`\`\`bash
npm install @neondatabase/serverless
\`\`\`

3. **Create database client** (`lib/db.ts`):
\`\`\`typescript
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getContracts() {
  return await sql`SELECT * FROM contracts`
}
\`\`\`

## Adding New Features

### Adding a New Module

1. **Create module directory**: `app/new-module/page.tsx`

2. **Add to home page** (`app/page.tsx`):
\`\`\`typescript
const modules = [
  // ... existing modules
  {
    titleKey: "newModule" as const,
    descKey: "newModuleDesc" as const,
    icon: YourIcon,
    href: "/new-module",
    color: "text-blue-500",
  },
]
\`\`\`

3. **Add translations** (`lib/translations.ts`):
\`\`\`typescript
export const translations = {
  en: {
    // ... existing translations
    newModule: "New Module",
    newModuleDesc: "Description of new module",
  },
  ka: {
    // ... existing translations
    newModule: "ახალი მოდული",
    newModuleDesc: "ახალი მოდულის აღწერა",
  },
}
\`\`\`

### Adding a New Data Entity

1. **Define TypeScript interface** (`lib/db-schema.ts`):
\`\`\`typescript
export interface NewEntity {
  id: string
  name: string
  created_at: string
  // ... other fields
}
\`\`\`

2. **Add mock data** (`lib/mock-data.ts`):
\`\`\`typescript
export const mockNewEntities: NewEntity[] = [
  {
    id: "1",
    name: "Example",
    created_at: new Date().toISOString(),
  },
]
\`\`\`

3. **Add to data store** (`lib/data-store.ts`):
\`\`\`typescript
interface DataStore {
  // ... existing state
  newEntities: NewEntity[]
  addNewEntity: (entity: NewEntity) => void
  updateNewEntity: (id: string, entity: Partial<NewEntity>) => void
  deleteNewEntity: (id: string) => void
}

// ... in the store implementation
newEntities: mockNewEntities,
addNewEntity: (entity) =>
  set((state) => ({ newEntities: [...state.newEntities, entity] })),
// ... other CRUD operations
\`\`\`

4. **Create admin manager component** (`components/admin/new-entities-manager.tsx`)

5. **Add to admin panel** (`app/admin/page.tsx`)

## Multi-Language Support

### Adding a New Language

Edit `lib/translations.ts`:

\`\`\`typescript
export const translations = {
  en: { /* English translations */ },
  ka: { /* Georgian translations */ },
  es: { /* Spanish translations */ },  // New language
}

export type Language = "en" | "ka" | "es"  // Add to type
\`\`\`

### Using Translations in Components

\`\`\`typescript
import { useLanguage } from "@/lib/language-context"

function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => setLanguage("ka")}>
        Switch to Georgian
      </button>
    </div>
  )
}
\`\`\`

## Styling and Theming

### Color System

The app uses a dark theme with the following color tokens (defined in `app/globals.css`):

- `--background`: Main background color
- `--foreground`: Main text color
- `--primary`: Primary brand color (blue)
- `--accent`: Accent color (yellow)
- `--muted`: Muted text color
- `--border`: Border color

### Modifying Colors

Edit `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: #3b82f6;  /* Change primary color */
  --color-accent: #fbbf24;   /* Change accent color */
}
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables

If using a database, add these to your deployment:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Neon
DATABASE_URL=your_neon_connection_string
\`\`\`

## Testing

### Manual Testing Checklist

- [ ] All module pages load correctly
- [ ] Language switcher works
- [ ] Admin panel CRUD operations work
- [ ] Data persists across page refreshes
- [ ] Navigation between modules works
- [ ] Forms validate correctly
- [ ] Tables display data correctly

## Common Issues and Solutions

### Data Not Persisting

**Problem**: Changes in admin panel don't persist after refresh

**Solution**: Check browser's localStorage. Clear it and reload:
\`\`\`javascript
localStorage.clear()
location.reload()
\`\`\`

### Language Not Changing

**Problem**: Language switcher doesn't update text

**Solution**: Ensure all text uses the `t()` function:
\`\`\`typescript
// Wrong
<h1>Welcome</h1>

// Correct
<h1>{t("welcome")}</h1>
\`\`\`

### Module Page Not Found

**Problem**: 404 error when clicking module card

**Solution**: Ensure the module directory exists in `app/` with a `page.tsx` file

## Performance Optimization

### For Production

1. **Enable React Compiler** (already configured in `next.config.js`)
2. **Optimize images**: Use Next.js `<Image>` component
3. **Code splitting**: Modules are automatically code-split by Next.js
4. **Database indexing**: Add indexes to frequently queried columns

## Support and Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)
- **Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

## Contributing

When adding new features:

1. Follow the existing code structure
2. Add TypeScript types for all data
3. Include translations for both English and Georgian
4. Test in both languages
5. Update this documentation

---

**Last Updated**: January 2025
**Version**: 1.0.0
