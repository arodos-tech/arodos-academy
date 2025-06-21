# 🎓 Arodos Academy – Developer Guide

---

## 🔧 Tech Stack

- **Next.js 15.3.4**
- **TypeScript** – use .ts/.tsx files but no need of types/interfaces. simply use "any" if the linter complains.
- **Mantine UI** – for layout, spacing, components, and theme - https://mantine.dev, https://mantine.dev/getting-started/
- **Zustand** – global in-memory state (auth, theme, UI toggles) - custom implementation in src/services/store and states in src/AppStore.ts
- **Axios** – for all API calls - use axios not fetch
- **Framer Motion** – for smooth animations and transitions

---

## 🧱 Architecture Principles

### 🔹 Feature-First Architecture

- Each feature is self-contained in its own folder
- Business logic lives in custom hooks within the feature folder
- UI components should be dumb and reusable
- Never duplicate business logic across features
- Shared utilities and types should be placed in appropriate shared locations
- Use arrow functions for components

## global state and local storage

- Do not use local storage directly. My zustand implementation handles it -
- in AppStore.ts use persist to save state in local storage.
- use global state variable from AppStore to use globally
- never modify any files in src/services/store
- never use types in AppStore.ts

## Always ensure that arrays or objects exist and are valid before accessing their values, properties, or looping through them. Use optional chaining (?.) to safely handle cases where the array or object might be null or undefined.

### 🔹 File Naming

| Type                | Format                         |
| ------------------- | ------------------------------ |
| Files/Folders       | `kebab-case`                   |
| Components          | `PascalCase`                   |
| Hooks               | `use-feature.ts` (kebab-case)  |
| Variables/Functions | `camelCase`                    |
| Database Fields     | `snake_case`                   |
| Exports             | Named exports                  |
| Exceptions          | `AppStore.ts`, `AppActions.ts` |

---

## 🗃️ Folder Structure

```
src/
├── pages/
│   ├── home/                 # Landing page
│   │   ├── components/       # Hero, Features, Testimonials, etc.
│   │   └── index.tsx
│   │
│   ├── courses/             # Courses listing and details
│   │   ├── components/       # Course cards, filters, etc.
│   │   ├── [id].tsx         # Dynamic course detail page
│   │   └── index.tsx
│   │
│   ├── programs/            # Training programs
│   │   ├── internship/       # Internship program
│   │   ├── fullstack/        # Full Stack Development
│   │   └── index.tsx
│   │
│   ├── auth/                # Authentication related pages and logic
│   │   ├── login.tsx         # Login page
│   │   ├── register.tsx      # Registration page
│   │   ├── use-auth.ts       # Auth custom hook
│   │   └── components/       # Auth-specific components
│   │
│   ├── courses/             # Courses feature
│   │   ├── index.tsx         # Courses listing page
│   │   ├── course-details.tsx         # Single course page
│   │   ├── use-courses.ts    # Courses API hooks
│   │   └── components/       # Course-specific components
│   │
│   └── ...                # Other features follow same pattern
│
├── components/             # Shared components
│   ├── shared/              # Reusable layout components (like header, footer, etc)
│   └── ui/                  # Atomic UI components (buttons, inputs, etc)
│
├── services/
│   ├── api/                # API client setup
│   └── store/              # Zustand store slices
│
├── assets/
│   ├── icons/index.ts
│   └── styles/globals.css
│
├── AppStore.ts
└── AppActions.ts
```

### Feature Folder Structure

Each feature (auth, courses, etc.) follows this pattern:

```
feature-name/
├── index.tsx           # Main page/entry point
├── feature-details.tsx # Dynamic route (if needed)
├── use-feature.ts     # Custom hooks
├── components/        # Feature-specific components
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
```

---

## 🔐 Authentication

- Auth handled via `use-auth.ts`
- Zustand (custom implementation in `src/services/store` and states in `src/AppStore.ts`) holds session info:

```ts
auth: {
  user: {},              // user object
  isLoggedIn: boolean,
  persist: true
}
```

- Login, logout, register actions in `auth/actions.ts`
- Session automatically synced on load using `syncAuthState()`

---

## 🎨 UI Design

- **Mantine UI** for:

  - Layout (e.g. `Container`, `Grid`, `Stack`)
  - Styling and spacing
  - Theming (via `MantineProvider`)

- **Responsive, accessible, fast, and secure** (OWASP)
- Global theme defined in `globals.css` and Mantine config
- Icons imported from `src/assets/icons/index.ts`

---

## 🎨 UI/UX Design

### Design Inspiration

- Follow the modern, clean aesthetic of https://monkshub-pro.framer.website/
- Match the color scheme with Arodos brand (reference: https://arodos.com/)
- Implement smooth animations and micro-interactions for better user engagement
- Ensure excellent mobile responsiveness

### UI Components

- **Mantine UI** for all components
  - Layout: `Container`, `Grid`, `Stack`
  - Navigation: `AppShell`, `Navbar`
  - Forms: `TextInput`, `Select`, `Checkbox`
  - Feedback: `Modal`, `Notification`
  - Data Display: `Card`, `Table`, `List`

### Theme & Styling

- Primary color: Match Arodos brand colors
- Typography: Modern, clean font stack
- Spacing: Consistent 8px base unit
- Dark/Light mode support
- Global styles in `src/theme/theme.ts`, don't use hard coded colors anywhere.
- All pages and components and colors must respect dark and light mode theme
- Use CSS variables for theming
- Icons from `@mantine/core` and `@tabler/icons-react`
- use AppStore.ts to access global state for theme control
-

## 🧱 Layout System

- All pages (except login, signup, 404) must show `Navbar` and `Header`
- Other pages automatically show the shared `Navbar` and `Header` from `components/shared/`

---

## 🔔 Notifications

| Action         | Toast Message               |
| -------------- | --------------------------- |
| Login          | `Welcome back, <user>`      |
| Logout         | `You've been logged out`    |
| API Error      | Friendly, non-technical msg |
| Multi-step Ops | Consolidated, single toast  |

---

## 🧩 Reusability Strategy

- UI components → `components/ui/`
- Layout/shared elements → `components/shared/`
- Hooks → `hooks/` (all logic)
- Pages → use hooks, avoid logic directly

---
