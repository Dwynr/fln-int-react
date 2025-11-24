// CHALLENGE: This component and UserProfile have duplicate React Query logic
// TODO: Extract the duplicate logic into a custom hook that wraps useQuery
// The hook should handle the common patterns used in both components

import { type ReactElement } from "react"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

type Todo = {
	id: number
	title: string
	completed: boolean
}

// Simulated API call
const fetchTodos = async (userId: number): Promise<Todo[]> => {
	// Simulate network delay
	await new Promise<void>(resolve => setTimeout(resolve, 1000))

	return Array.from(
		{
			length: 5
		},
		(_, i) => ({
			id: i + 1,
			title: `Todo ${i + 1} for user ${userId}`,
			completed: Math.random() > 0.5
		})
	)
}

function TodoList({ userId }: { userId: number }): ReactElement {
	console.log(`[RENDER] TodoList - ${new Date().toISOString().substring(11, 23)}`)

	// Duplicate logic that should be extracted into a custom hook
	const { data, isLoading, error } = useQuery({
		queryKey: ["todos", userId],
		queryFn: () => fetchTodos(userId)
	})

	if (isLoading) {
		return <div className="p-4 border rounded-lg">Loading todos...</div>
	}

	if (error) {
		return <div className="p-4 border rounded-lg text-red-500">{error instanceof Error ? error.message : "Failed to fetch todos"}</div>
	}

	if (!data) {
		return <div className="p-4 border rounded-lg">No data found</div>
	}

	return (
		<div className="p-4 border rounded-lg space-y-2">
			<h3 className="text-lg font-bold">Todo List</h3>
			<ul className="space-y-1">
				{data.map(todo => (
					<li
						key={todo.id}
						className="flex items-center gap-2"
					>
						<input
							type="checkbox"
							checked={todo.completed}
							readOnly
						/>
						<span className={cn(todo.completed && "line-through text-muted-foreground")}>{todo.title}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TodoList
