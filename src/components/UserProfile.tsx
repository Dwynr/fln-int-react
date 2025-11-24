// CHALLENGE: This component and TodoList have duplicate React Query logic
// TODO: Extract the duplicate logic into a custom hook that wraps useQuery
// The hook should handle the common patterns used in both components

import { type ReactElement } from "react"
import { useQuery } from "@tanstack/react-query"

type UserProfileData = {
	id: number
	name: string
	email: string
	bio: string
}

// Simulated API call
const fetchUserProfile = async (userId: number): Promise<UserProfileData> => {
	// Simulate network delay
	await new Promise<void>(resolve => setTimeout(resolve, 1000))

	return {
		id: userId,
		name: `User ${userId}`,
		email: `user${userId}@example.com`,
		bio: "This is a mock user profile"
	}
}

function UserProfile({ userId }: { userId: number }): ReactElement {
	console.log(`[RENDER] UserProfile - ${new Date().toISOString().substring(11, 23)}`)

	// Duplicate logic that should be extracted into a custom hook
	const { data, isLoading, error } = useQuery({
		queryKey: ["user-profile", userId],
		queryFn: () => fetchUserProfile(userId)
	})

	if (isLoading) {
		return <div className="p-4 border rounded-lg">Loading user profile...</div>
	}

	if (error) {
		return (
			<div className="p-4 border rounded-lg text-red-500">
				{error instanceof Error ? error.message : "Failed to fetch user profile"}
			</div>
		)
	}

	if (!data) {
		return <div className="p-4 border rounded-lg">No data found</div>
	}

	return (
		<div className="p-4 border rounded-lg space-y-2">
			<h3 className="text-lg font-bold">{data.name}</h3>
			<p className="text-sm text-muted-foreground">{data.email}</p>
			<p className="text-sm">{data.bio}</p>
		</div>
	)
}

export default UserProfile
