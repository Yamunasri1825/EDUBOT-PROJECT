import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, removeTask }) => {
    if (tasks.length === 0) {
        return (
            <Typography variant="body1" gutterBottom>
                No tasks found.
            </Typography>
        );
    }

    return (
        <List>
            {tasks.map((task, index) => (
                <ListItem key={index} divider>
                    <ListItemText primary={task.title} secondary={`Assigned to: ${task.assignedTo}`} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => removeTask(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
