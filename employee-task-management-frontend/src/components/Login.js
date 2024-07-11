import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { users, addUser } from '../users';

const Login = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');

  // Handle login or registration based on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  // Handle login functionality
  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setUser(user);
    } else {
      setError('Invalid credentials');
    }
  };

  // Handle registration functionality
  const handleRegister = () => {
    if (!username || !password || !name || !position) {
      setError('All fields are required');
      return;
    }

    if (/\s/.test(username)) {
      setError('Username cannot contain spaces');
      return;
    }

    if (users.find((u) => u.username === username)) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      username,
      password,
      role: 'employee',
      data: { name, position, tasks: [] },
    };
    addUser(newUser);
    setUser(newUser);
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {isRegistering && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Position"
              variant="outlined"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </Box>
      <Button onClick={() => setIsRegistering(!isRegistering)} fullWidth sx={{ mt: 2 }}>
        {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </Button>
    </Box>
  );
};

export default Login;
