import { useState, useEffect, type ReactElement } from "react"
import UserList from "./components/UserList"
import UserCard from "./components/UserCard"
import ExpensiveCalculator from "./components/ExpensiveCalculator"
import SearchableList from "./components/SearchableList"
import DataGrid from "./components/DataGrid"
import UserProfile from "./components/UserProfile"
import TodoList from "./components/TodoList"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { cn } from "./lib/utils"
import type { User } from "./types"

const mockUsers: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "Admin"
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User"
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User"
	}
]

function App(): ReactElement {
	const [counter, setCounter] = useState<number>(0)
	const [selectedTab, setSelectedTab] = useState<"memo" | "usememo" | "callback" | "custom" | "refactor" | "hooks">("memo")
	const [users, setUsers] = useState<User[]>(mockUsers)

	// Simulate updating user data with new timestamps
	useEffect(() => {
		const interval = setInterval(() => {
			setUsers(prev =>
				prev.map(user => ({
					...user,
					lastUpdated: Date.now()
				}))
			)
		}, 3000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const handleUserClick = (id: number): void => {
		console.log("User clicked:", id)
	}

	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-7xl mx-auto space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold">React Performance Interview Challenge</h1>
					<p className="text-muted-foreground">Open the browser console to see render logs and use React DevTools Profiler</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Global State</CardTitle>
						<CardDescription>This counter updates global state. Watch which components rerender unnecessarily.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							<span className="text-lg">Counter: {counter}</span>
							<Button onClick={() => setCounter(counter + 1)}>Increment</Button>
						</div>
					</CardContent>
				</Card>
				<div className="flex gap-2 border-b pb-2">
					<button
						onClick={() => setSelectedTab("memo")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "memo" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						React.memo
					</button>
					<button
						onClick={() => setSelectedTab("usememo")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "usememo" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						useMemo
					</button>
					<button
						onClick={() => setSelectedTab("callback")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "callback" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						useCallback
					</button>
					<button
						onClick={() => setSelectedTab("custom")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "custom" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						Custom Comparison
					</button>
					<button
						onClick={() => setSelectedTab("refactor")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "refactor" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						Refactoring
					</button>
					<button
						onClick={() => setSelectedTab("hooks")}
						className={cn(
							"px-4 py-2 rounded-t-lg",
							selectedTab === "hooks" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						)}
					>
						Custom Hooks
					</button>
				</div>
				<div className="space-y-6">
					{selectedTab === "memo" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 1: React.memo()</CardTitle>
								<CardDescription>
									The UserList below rerenders every time the global counter updates, even though its props haven't
									changed. Fix this using React.memo().
								</CardDescription>
							</CardHeader>
							<CardContent>
								<UserList
									users={mockUsers}
									onUserClick={handleUserClick}
								/>
							</CardContent>
						</Card>
					)}
					{selectedTab === "usememo" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 2: useMemo()</CardTitle>
								<CardDescription>
									The calculator below performs expensive computations on every render. Use useMemo() to optimize these
									calculations so they only run when inputs change.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ExpensiveCalculator />
							</CardContent>
						</Card>
					)}
					{selectedTab === "callback" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 3: useCallback()</CardTitle>
								<CardDescription>
									The SearchInput component rerenders unnecessarily because its callback prop is recreated. Use
									useCallback() and React.memo() to fix this.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<SearchableList />
							</CardContent>
						</Card>
					)}
					{selectedTab === "custom" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 4: Custom Comparison (arePropsEqual)</CardTitle>
								<CardDescription>
									These UserCards rerender every 2 seconds because of the lastUpdated timestamp, even though the display
									data hasn't changed. Use React.memo() with a custom comparison function.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{users.map(user => (
										<UserCard
											key={user.id}
											user={user}
											onClick={() => handleUserClick(user.id)}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					)}
					{selectedTab === "refactor" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 5: Component Refactoring</CardTitle>
								<CardDescription>
									The DataGrid below is too large and does too many things. Break it down into smaller, reusable
									components (Header, Row, Cell, Pagination, Filters).
								</CardDescription>
							</CardHeader>
							<CardContent>
								<DataGrid />
							</CardContent>
						</Card>
					)}
					{selectedTab === "hooks" && (
						<Card>
							<CardHeader>
								<CardTitle>Challenge 6: Custom Hooks</CardTitle>
								<CardDescription>
									Both components below have duplicate data fetching logic. Extract this into a reusable custom hook like
									useFetch or useDataFetcher.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<UserProfile userId={1} />
									<TodoList userId={1} />
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
