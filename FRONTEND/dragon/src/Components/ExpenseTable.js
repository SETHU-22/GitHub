import { useState, useEffect } from "react"

function ExpenseTable() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses")
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.name}</td>
            <td>{expense.amount.toFixed(2)}</td>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ExpenseTable;