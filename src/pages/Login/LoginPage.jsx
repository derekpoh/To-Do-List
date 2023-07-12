import LoginForm from "./LoginForm";
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';


const LoginPage = ({ setUser }) => {
    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "flex-start",
            minHeight: '100vh',
            paddingTop: theme => theme.spacing(4),
          }}
        >
          <img src="/list.jpeg" alt="Logo" width="80" />
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <LoginForm setUser={setUser} />
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" align="center">
                Don't have an account?
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
                to="/users/register"
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
            >
                Sign Up
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

  export default LoginPage