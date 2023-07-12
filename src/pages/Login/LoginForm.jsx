import { useState } from 'react';
import { getUser, login } from '../../utilities/user-services';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginForm = ({ setUser }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
    setError('');
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    try {
      const user = await login(form);
      setUser(getUser());
      navigate("/todolist");
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 2,
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Username"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Log In
      </Button>
      <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {error}
      </Typography>
    </Box>
  );
  
}

export default LoginForm