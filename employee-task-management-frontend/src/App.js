import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
const App = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  const removeEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error removing employee:', error);
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/employees/${id}`, updatedData);
      setEmployees(employees.map(employee => employee.id === id ? response.data : employee));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Employee Task Manager
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, {user.username} ({user.role})
        <Button onClick={() => setUser(null)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          Logout
        </Button>
      </Typography>
      {user.role === 'manager' && (
        <>
          <EmployeeForm addEmployee={addEmployee} />
          <EmployeeList employees={employees} removeEmployee={removeEmployee} updateEmployee={updateEmployee} />
          <TaskForm addTask={addTask} employees={employees} />
        </>
      )}
      <TaskList tasks={tasks} removeTask={removeTask} />
    </Container>
  );
};

export default App;
