import logo from './logo.svg';
import './App.css';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseTable from './Components/ExpenseTable';

function App() {
  return (
    <div className="App">
      <ExpenseForm/>
      <ExpenseTable/>
    </div>
  );
}

export default App;
