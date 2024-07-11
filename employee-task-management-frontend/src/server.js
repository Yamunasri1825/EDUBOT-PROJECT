const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let employees = [];

app.post('/api/employees', (req, res) => {
  const newEmployee = { ...req.body, id: Date.now() };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.get('/api/employees/getAll', (req, res) => {
  res.json(employees);
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(employee => employee.id !== parseInt(id));
  res.status(204).send();
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const updatedEmployee = { ...req.body, id: parseInt(id) };
  employees = employees.map(employee => employee.id === parseInt(id) ? updatedEmployee : employee);
  res.json(updatedEmployee);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
