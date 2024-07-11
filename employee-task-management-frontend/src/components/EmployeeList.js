import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const EmployeeList = ({ employees, removeEmployee, updateEmployee }) => {
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleClickOpen = (employee) => {
    setCurrentEmployee(employee);
    setName(employee.name);
    setPosition(employee.position);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee(null);
  };

  const handleUpdate = () => {
    updateEmployee(currentEmployee.id, { name, position });
    handleClose();
  };

  return (
    <div>
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id}>
            <ListItemText
              primary={employee.name}
              secondary={employee.position}
            />
            <ListItemSecondaryAction>
              <Button variant="contained" color="primary" onClick={() => handleClickOpen(employee)}>
                Update Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeEmployee(employee.id)}
                sx={{ ml: 2 }}
              >
                Remove
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Employee Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the details of the employee.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
