// CHALLENGE: This component rerenders every time the parent updates
// even though the users prop hasn't changed
// TODO: Fix unnecessary rerenders using React.memo()

import { type ReactElement } from "react"
import type { User } from "@/types"

type UserListProps = {
	users: User[]
	onUserClick: (id: number) => void
}

function UserList({ users, onUserClick }: UserListProps): ReactElement {
	console.log(`[RENDER] UserList - ${new Date().toISOString().substring(11, 23)}`)

	return (
		<div className="space-y-2">
			{users.map(user => (
				<div
					key={user.id}
					onClick={() => onUserClick(user.id)}
					className="p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
				>
					<h3 className="font-semibold">{user.name}</h3>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</div>
			))}
		</div>
	)
}

export default UserList
