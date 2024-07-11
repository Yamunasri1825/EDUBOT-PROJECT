import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import axios from 'axios';

const EmployeeForm = ({ addEmployee }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/employees', {
        name,
        position,
      });
      addEmployee(response.data);
      setSuccessMessage('Employee added successfully.');
      setName('');
      setPosition('');
      setError(null);
    } catch (error) {
      console.error('Error adding employee:', error.response || error.message || error);
      setError('Failed to add employee. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Position"
        variant="outlined"
        fullWidth
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Employee
      </Button>
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || successMessage}
      />
    </Box>
  );
};

export default EmployeeForm;
