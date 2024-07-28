const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let customers = [];
let currentId = 1;

// Get all customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

// Add a new customer
app.post('/customers', (req, res) => {
  const customer = { ...req.body, id: currentId++ };
  customers.push(customer);
  res.status(201).json(customer);
});

// Update a customer
app.put('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...req.body, id };
    res.json(customers[index]);
  } else {
    res.status(404).send('Customer not found');
  }
});

// Delete a customer
app.delete('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== id);
  res.send('Customer deleted');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

