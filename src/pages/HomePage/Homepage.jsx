import { Link } from "react-router-dom"
import { Container, Box, Typography, Button} from '@mui/material';

const HomePage = () => {

    return (
        <>
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
            Welcome!
          </Typography>
          <Typography variant="body2" align="center">
            Sign Up or Login to continue
            </Typography>

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
                to="/users/login"
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
            >
                Login
            </Button>
        </Box>
        
        </Box>
      </Container>
        </>
    )
}

export default HomePage