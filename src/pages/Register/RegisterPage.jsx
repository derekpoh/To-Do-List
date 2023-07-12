import { Container, Box, Typography } from '@mui/material';
import RegisterForm from "./RegisterForm";

const RegisterPage = ({setUser}) => {

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
            Sign Up
          </Typography>
          <RegisterForm setUser={setUser} />
        </Box>
      </Container>
    );
}

export default RegisterPage