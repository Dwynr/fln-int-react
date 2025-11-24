// CHALLENGE: This is a large monolithic component that does too many things
// TODO: Break this down into smaller, reusable components:
//   - DataGridHeader
//   - DataGridRow
//   - DataGridCell
//   - DataGridPagination
//   - DataGridFilters

import { useState, type ReactElement } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

type DataItem = {
	id: number
	name: string
	category: string
	price: number
	stock: number
	status: "active" | "inactive"
}

const categories = ["Electronics", "Clothing", "Food", "Books"] as const

const mockData: DataItem[] = Array.from({ length: 100 }, (_, i) => ({
	id: i + 1,
	name: `Product ${i + 1}`,
	category: categories[i % 4] ?? "Electronics",
	price: Math.random() * 1000,
	stock: Math.floor(Math.random() * 100),
	status: i % 3 === 0 ? "inactive" : "active"
}))

function DataGrid(): ReactElement {
	console.log(`[RENDER] DataGrid - ${new Date().toISOString().substring(11, 23)}`)

	const [data] = useState<DataItem[]>(mockData)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage] = useState<number>(10)
	const [sortColumn, setSortColumn] = useState<keyof DataItem>("id")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [filterCategory, setFilterCategory] = useState<string>("all")
	const [filterStatus, setFilterStatus] = useState<string>("all")

	const filteredData = data.filter(item => {
		if (filterCategory !== "all" && item.category !== filterCategory) {
			return false
		}

		if (filterStatus !== "all" && item.status !== filterStatus) {
			return false
		}

		return true
	})

	const sortedData = [...filteredData].sort((a, b) => {
		const aVal = a[sortColumn]
		const bVal = b[sortColumn]

		if (aVal < bVal) {
			return sortDirection === "asc" ? -1 : 1
		}

		if (aVal > bVal) {
			return sortDirection === "asc" ? 1 : -1
		}

		return 0
	})

	const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	const totalPages = Math.ceil(sortedData.length / itemsPerPage)

	const handleSort = (column: keyof DataItem): void => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortColumn(column)
			setSortDirection("asc")
		}
	}

	return (
		<div className="space-y-4 p-6 border rounded-lg">
			<h2 className="text-xl font-bold">Data Grid</h2>
			<div className="flex gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">Category</label>
					<select
						value={filterCategory}
						onChange={e => setFilterCategory(e.target.value)}
						className="px-3 py-2 border rounded-md"
					>
						<option value="all">All Categories</option>
						<option value="Electronics">Electronics</option>
						<option value="Clothing">Clothing</option>
						<option value="Food">Food</option>
						<option value="Books">Books</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Status</label>
					<select
						value={filterStatus}
						onChange={e => setFilterStatus(e.target.value)}
						className="px-3 py-2 border rounded-md"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-muted">
							<th
								onClick={() => handleSort("id")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								ID {sortColumn === "id" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("name")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("category")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								Category {sortColumn === "category" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("price")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								Price {sortColumn === "price" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("stock")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								Stock {sortColumn === "stock" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("status")}
								className="p-2 text-left cursor-pointer hover:bg-muted/80"
							>
								Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
							</th>
						</tr>
					</thead>
					<tbody>
						{paginatedData.map(item => (
							<tr
								key={item.id}
								className="border-b hover:bg-muted/50"
							>
								<td className="p-2">{item.id}</td>
								<td className="p-2">{item.name}</td>
								<td className="p-2">{item.category}</td>
								<td className="p-2">${item.price.toFixed(2)}</td>
								<td className="p-2">{item.stock}</td>
								<td className="p-2">
									<span
										className={cn(
											"px-2 py-1 rounded text-xs",
											item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
										)}
									>
										{item.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
					{sortedData.length} items
				</div>
				<div className="flex gap-2">
					<Button
						onClick={() => setCurrentPage(1)}
						disabled={currentPage === 1}
						variant="outline"
						size="sm"
					>
						First
					</Button>
					<Button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
						variant="outline"
						size="sm"
					>
						Previous
					</Button>
					<div className="flex items-center px-3 text-sm">
						Page {currentPage} of {totalPages}
					</div>
					<Button
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						variant="outline"
						size="sm"
					>
						Next
					</Button>
					<Button
						onClick={() => setCurrentPage(totalPages)}
						disabled={currentPage === totalPages}
						variant="outline"
						size="sm"
					>
						Last
					</Button>
				</div>
			</div>
		</div>
	)
}

export default DataGrid
