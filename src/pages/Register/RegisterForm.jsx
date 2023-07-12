import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/user-services";
import { Box, TextField, Button, Grid, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = ({setUser}) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm: ""
    })
    const disable = form.password !== form.confirm;
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await signUp(form);
        setUser(getUser());
        navigate("/todolist");
      } catch (error) {
        if (error.message.includes("email")) {
          setError("This email already has an account");
        } else {
          setError(error.message);
        }
      }
    };
  
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    };
  
    return (
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              minHeight: '100vh',
            }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                inputProps= {{ minLength: 3, maxLength: 30 }}
              />
              <TextField
                label="Re-type Password"
                fullWidth
                margin="normal"
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                required
                inputProps= {{ minLength: 3, maxLength: 30 }}
              />
              <Button
                type="submit"
                disabled={disable}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ marginTop: 3 }}
            >
              {error}
            </Typography>
            </form>
            <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
              <Grid item>
                <Typography variant="body2" align="center">
                  Already have an account?
                </Typography>
              </Grid>
            </Grid>

            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
            <Button
                component={Link}
                to="/users/login"
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
            >
                Login
            </Button>
            <Button
                component={Link}
                to="/"
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
            >
                Home
            </Button>
        </Box>

          </Box>
        </Container>
    );
}

export default RegisterForm