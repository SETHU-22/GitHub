const express = require('express');
const mongoose = require("mongoose")
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json())

//app.get('/', (req, res) => {
//res.send('Hello, Express.js!');    
//});

const mongoURI = 'mongodb+srv://DBUSER:DB56837@cluster0.lewi8.mongodb.net/expensedb?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI,
   { useNewUrlParser: true,useUnifiedTopology: true }) 
    .then(() => console.log('mongoDB connected to MongoDB'))
    .catch((err) => 
    console.error('MongoDB connection error:', err));
const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: Date,
})

 const Expense = mongoose.model("Expense", expenseSchema)
app.post("/api/expenses", async (req, res) => {
    try {
        const newExpense = new Expense(req.body)
        await newExpense.save()
        res.status(200).json(newExpense)
     } catch (error) {
        res.status(400).json({ message: error.message})
     }
     
}) 
app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.json(expenses)
    }   catch (error) {
        res.status(500).json({ message: error.message })
    }
    })

    app.put("/api/expense/:id", async (req, res) => {
        try {
            const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true})
            res.json({
                message: "Expense update successfully",
                updatedExpense,

            });
        }  catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
            
           
       


app.delete("/api/expense/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: "Expense deleted successfully" })
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(8080, () => {
console.log('Server is running on http://localhost:8080');
    
});
