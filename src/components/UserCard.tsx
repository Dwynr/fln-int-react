// CHALLENGE: This component receives a user object with a lastUpdated timestamp
// that changes frequently but doesn't affect the display
// TODO: Use React.memo() with a custom arePropsEqual function to ignore lastUpdated

import { type ReactElement } from "react"
import type { User } from "@/types"

type UserCardProps = {
	user: User
	onClick: () => void
}

function UserCard({ user, onClick }: UserCardProps): ReactElement {
	console.log(`[RENDER] UserCard: ${user.name} - ${new Date().toISOString().substring(11, 23)}`)

	return (
		<div
			onClick={onClick}
			className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
		>
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
					{user.name.charAt(0)}
				</div>
				<div>
					<h3 className="font-semibold">{user.name}</h3>
					<p className="text-sm text-muted-foreground">{user.email}</p>
					{user.role && <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-secondary rounded">{user.role}</span>}
				</div>
			</div>
		</div>
	)
}

export default UserCard
