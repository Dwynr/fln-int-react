# React Performance Interview Challenge

Welcome to the React Performance Interview Challenge! This project contains several intentional performance issues and code quality problems that you'll need to identify and fix.

## Setup

1. Fork this repository to your own GitHub account
2. Clone your fork locally:

    ```bash
    git clone <your-fork-url>
    cd react-interview-challenge
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Requirements

- Node.js 24+ and npm
- React DevTools browser extension (recommended)
- Basic understanding of Git

## Overview

This application demonstrates common React performance issues. Your task is to:

1. Identify performance problems using browser DevTools and React DevTools Profiler
2. Fix the issues using appropriate React optimization techniques
3. Refactor code for better maintainability
4. Create reusable custom hooks
5. Demonstrate Git workflow knowledge

## Tech Stack

This project uses:

- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **ESLint** - Strict linting with type-aware rules
- **Prettier** - Code formatting
- **React Compiler** (optional) - Experimental automatic optimization

### Important Notes:

- We use **React Query** for all data fetching, not useState/useEffect patterns
- TypeScript config is set to **very strict** mode (noUncheckedIndexedAccess, etc.)
- ESLint uses **strict type-checked rules** - warnings are intentional learning opportunities
- Focus on performance, type safety, and code quality

## Challenges

### Challenge 1: React.memo()

**File:** `src/components/UserList.tsx`

**Problem:** The UserList component rerenders every time the parent updates, even though its props haven't changed.

**Task:**

- Wrap the component with `React.memo()` to prevent unnecessary rerenders
- Verify the fix by watching console logs

**Hint:** Check if memoizing UserList alone is sufficient, or if you need to also memoize the callback

---

### Challenge 2: useMemo()

**File:** `src/components/ExpensiveCalculator.tsx`

**Problem:** Expensive calculations (Fibonacci and prime factors) run on every render, even when only unrelated state changes.

**Task:**

- Use `useMemo()` to memoize the expensive calculations
- Ensure calculations only run when `input` changes, not when `count` changes
- Watch console logs to verify the optimization

**Hint:** You'll need two `useMemo()` calls - one for each expensive calculation

---

### Challenge 3: useCallback()

**File:** `src/components/SearchableList.tsx`

**Problem:** The SearchInput child component rerenders unnecessarily because its callback prop is recreated on every render.

**Task:**

- Wrap the `handleSearch` callback with `useCallback()`
- Memoize the SearchInput component with `React.memo()`
- Verify that SearchInput no longer rerenders when the counter increments

**Hint:** Remember that both the callback AND the child component need optimization

---

### Challenge 4: Custom Comparison (arePropsEqual)

**File:** `src/components/UserCard.tsx`

**Problem:** UserCards rerender every 2 seconds due to a `lastUpdated` timestamp that doesn't affect the display.

**Task:**

- Use `React.memo()` with a custom comparison function
- The comparison should ignore the `lastUpdated` property
- Cards should only rerender when `name`, `email`, or `role` change

**Example:**

```typescript
const arePropsEqual = (prevProps: UserCardProps, nextProps: UserCardProps) => {
	// Implement custom comparison logic
}

export default React.memo(UserCard, arePropsEqual)
```

---

### Challenge 5: Component Refactoring

**File:** `src/components/DataGrid.tsx`

**Problem:** The DataGrid component is too large and does too many things (200+ lines).

**Task:**

- Break down DataGrid into smaller, reusable components:
    - `DataGridFilters` - for category and status filters
    - `DataGridHeader` - for the table header with sortable columns
    - `DataGridRow` - for individual table rows
    - `DataGridPagination` - for pagination controls
- Each component should have a single responsibility
- Consider memoizing the new components where appropriate

**Hint:** Think about which parts of the component can be extracted and reused

---

### Challenge 6: Custom Hooks with React Query

**Files:** `src/components/UserProfile.tsx` and `src/components/TodoList.tsx`

**Problem:** Both components have duplicate React Query logic patterns.

**Task:**

- Create a reusable custom hook that wraps `useQuery` (e.g., `useTypedQuery` or `useDataQuery`)
- Extract the common pattern into `src/hooks/` directory (you'll need to create this)
- Refactor both components to use your custom hook
- The hook should provide a cleaner API while maintaining type safety

**Example approach:**

```typescript
// Create a custom hook that abstracts common useQuery patterns
function useTypedQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
	// Wrap useQuery with common options
	// Return a simplified API
}
```

**Bonus:** Add error boundaries or additional data transformations in the custom hook

---

### Challenge 7: Browser Profiler

**Task:** Use the browser's Performance Profiler to identify bottlenecks

1. Open Chrome DevTools (F12)
2. Go to the Performance tab
3. Click Record
4. Interact with the app (click buttons, switch tabs)
5. Stop recording
6. Analyze the flame graph to identify long-running tasks

**Questions to answer:**

- Which components take the longest to render?
- Are there any unnecessary rerenders?
- What is the impact of your optimizations on render times?

---

### Challenge 8: React DevTools Profiler

**Task:** Use React DevTools Profiler to measure component performance

1. Install React DevTools extension
2. Open DevTools and go to the Profiler tab
3. Start profiling
4. Interact with the application
5. Stop profiling
6. Analyze which components rendered and why

**What to look for:**

- Components that render frequently but shouldn't
- Components with long render times
- Unnecessary prop changes causing rerenders

---

### Challenge 9: React Compiler (Optional Advanced)

**File:** `vite.config.ts`

**Task:** Experiment with React Compiler (experimental feature)

1. Uncomment the React Compiler plugin in `vite.config.ts`
2. Restart the dev server
3. Compare performance with and without the compiler
4. Note any differences in render behavior

**Note:** React Compiler is experimental and may have limitations

---

### Challenge 10: TailwindCSS

**Task:** Demonstrate TailwindCSS knowledge

Throughout the challenges, you may need to:

- Adjust spacing and layout using Tailwind utility classes
- Use responsive design classes (sm:, md:, lg:)
- Apply hover and focus states
- Use the theme colors defined in the config

---

### Challenge 11: Git Workflow

**Tasks:**

1. Create a new branch for your work:

    ```bash
    git checkout -b fix/performance-optimizations
    ```

2. Make commits with meaningful messages as you complete each challenge:

    ```bash
    git add src/components/UserList.tsx
    git commit -m "fix: add React.memo to UserList to prevent unnecessary rerenders"
    ```

3. When finished, push your branch:

    ```bash
    git push -u origin fix/performance-optimizations
    ```

4. Create a pull request on GitHub with:
    - A clear title
    - Description of changes made
    - Before/after performance comparisons
    - Screenshots or recordings (optional)

**Good commit message examples:**

- `fix: memoize expensive calculations in ExpensiveCalculator`
- `refactor: extract DataGrid into smaller components`
- `feat: add useFetch custom hook for data fetching`
- `perf: add useCallback to prevent SearchInput rerenders`

---

## Testing Your Work

1. **Console Logs**: Watch the console for render logs (🔴 markers)
    - Before optimization: many logs
    - After optimization: fewer logs

2. **React DevTools Profiler**:
    - Record a profiling session
    - Check "Ranked" view to see most expensive renders
    - Look at "Flamegraph" to see component hierarchy

3. **Visual Verification**:
    - App should work the same visually
    - All interactions should still work
    - No console errors

## Evaluation Criteria

You will be evaluated on:

1. **Problem Identification**: Can you spot performance issues?
2. **Technical Solutions**: Do you use the right tools (memo, useMemo, useCallback)?
3. **Code Quality**: Is your code clean, readable, and well-organized?
4. **Component Design**: Can you break down large components effectively?
5. **Custom Hooks**: Can you identify and extract reusable logic?
6. **Git Skills**: Do you make clear, atomic commits with good messages?
7. **TailwindCSS**: Can you work with utility-first CSS?
8. **Profiling**: Can you use browser and React DevTools effectively?

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted

## Resources

- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Query Best Practices](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)

## Tips

1. Start with the console logs - they'll guide you to the problems
2. Use React DevTools Profiler to measure impact of your changes
3. Test each optimization individually
4. Don't over-optimize - only fix actual problems
5. Keep commits small and focused
6. Run `npm run lint` before committing

## Questions?

If you get stuck:

1. Check the hints in each challenge
2. Review the linked documentation
3. Use console.log and React DevTools to debug
4. Ask the interviewer for clarification
