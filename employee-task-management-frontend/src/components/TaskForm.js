import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import axios from 'axios';

const TaskForm = ({ addTask, employees, editTask, taskToEdit }) => {
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setDescription(taskToEdit.description);
      setAssignedTo(taskToEdit.assignedTo);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!description || !assignedTo) {
        setError('Description and Assigned To are required.');
        return;
      }

      const newTask = { description, assignedTo };

      if (taskToEdit) {
        await editTask(taskToEdit.id, newTask);
        setSuccessMessage('Task updated successfully.');
      } else {
        await addTask(newTask);
        setSuccessMessage('Task added successfully.');
      }

      setDescription('');
      setAssignedTo('');
      setError(null);
    } catch (error) {
      console.error('Error adding/updating task:', error);
      setError('Failed to add/update task. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError(null);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Assigned To</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            label="Assigned To"
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.name}>
                {employee.name} - {employee.position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || successMessage}
      />
    </Box>
  );
};

export default TaskForm;
