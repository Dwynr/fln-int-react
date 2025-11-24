// CHALLENGE: This component performs expensive calculations on every render
// even when the input hasn't changed
// TODO: Use useMemo() to optimize the expensive calculations

import { useState, type ReactElement } from "react"
import { Button } from "./ui/button"

function ExpensiveCalculator(): ReactElement {
	console.log(`[RENDER] ExpensiveCalculator - ${new Date().toISOString().substring(11, 23)}`)

	const [count, setCount] = useState<number>(0)
	const [input, setInput] = useState<number>(20)

	// This expensive calculation runs on every render, even when only count changes
	const fibonacci = (n: number): number => {
		console.log(`[EXPENSIVE] Calculating fibonacci - ${new Date().toISOString().substring(11, 23)}`)

		if (n <= 1) {
			return n
		}

		return fibonacci(n - 1) + fibonacci(n - 2)
	}

	const result = fibonacci(Math.min(input, 25)) // Cap at 25 to prevent browser freeze

	const primeFactors = (num: number): number[] => {
		console.log(`[EXPENSIVE] Calculating prime factors - ${new Date().toISOString().substring(11, 23)}`)

		const factors: number[] = []
		let divisor = 2

		while (num >= 2) {
			if (num % divisor === 0) {
				factors.push(divisor)
				num = num / divisor
			} else {
				divisor++
			}
		}

		return factors
	}

	const factors = primeFactors(input)

	return (
		<div className="space-y-4 p-6 border rounded-lg">
			<div>
				<h2 className="text-xl font-bold mb-2">Expensive Calculator</h2>
				<p className="text-sm text-muted-foreground">Count (doesn't affect calculations): {count}</p>
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium">
					Input Number (values over 25 may be slow):
					<input
						type="number"
						value={input}
						onChange={e => setInput(Number(e.target.value))}
						max={25}
						min={1}
						className="mt-1 block w-full px-3 py-2 border rounded-md"
					/>
				</label>
				<p className="text-xs text-muted-foreground">Start at 20 and increase gradually to observe performance differences.</p>
			</div>

			<div className="space-y-2">
				<p>
					Fibonacci({Math.min(input, 25)}): <strong>{result}</strong>
				</p>
				<p>
					Prime Factors of {input}: <strong>{factors.join(", ")}</strong>
				</p>
			</div>

			<Button onClick={() => setCount(count + 1)}>Increment Count (triggers rerender)</Button>
		</div>
	)
}

export default ExpensiveCalculator
