// CHALLENGE: The SearchInput child component rerenders unnecessarily
// because the onSearch callback is recreated on every render
// TODO: Use useCallback() to memoize the callback and React.memo() on SearchInput

import { useState, type ReactElement } from "react"
import { Button } from "./ui/button"

type SearchInputProps = {
	value: string
	onSearch: (value: string) => void
	placeholder?: string
}

// This component should be memoized to prevent unnecessary rerenders
function SearchInput({ value, onSearch, placeholder }: SearchInputProps): ReactElement {
	console.log(`[RENDER] SearchInput - ${new Date().toISOString().substring(11, 23)}`)

	return (
		<input
			type="text"
			value={value}
			onChange={e => onSearch(e.target.value)}
			placeholder={placeholder}
			className="w-full px-3 py-2 border rounded-md"
		/>
	)
}

const items = [
	"Apple",
	"Banana",
	"Cherry",
	"Date",
	"Elderberry",
	"Fig",
	"Grape",
	"Honeydew",
	"Kiwi",
	"Lemon",
	"Mango",
	"Nectarine",
	"Orange",
	"Papaya",
	"Quince"
]

function SearchableList(): ReactElement {
	console.log(`[RENDER] SearchableList - ${new Date().toISOString().substring(11, 23)}`)

	const [searchTerm, setSearchTerm] = useState<string>("")
	const [count, setCount] = useState<number>(0)

	// This callback is recreated on every render, causing SearchInput to rerender
	const handleSearch = (value: string): void => {
		setSearchTerm(value)
	}

	const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div className="space-y-4 p-6 border rounded-lg">
			<div>
				<h2 className="text-xl font-bold mb-2">Searchable List</h2>
				<p className="text-sm text-muted-foreground">Counter (unrelated state): {count}</p>
			</div>
			<SearchInput
				value={searchTerm}
				onSearch={handleSearch}
				placeholder="Search fruits..."
			/>
			<div className="space-y-1">
				{filteredItems.map(item => (
					<div
						key={item}
						className="p-2 border rounded"
					>
						{item}
					</div>
				))}
			</div>
			<Button onClick={() => setCount(count + 1)}>Increment Counter (causes SearchInput to rerender)</Button>
		</div>
	)
}

export default SearchableList
