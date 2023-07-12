import { Container, Box, Typography, Button} from '@mui/material';
import { useNavigate } from "react-router";
import { logOut } from "../../utilities/user-services"
import { Link } from 'react-router-dom';
import ToDoListItem from './ToDoListItem';
import { useEffect, useState } from 'react';

 

const ToDoList = ({user, setUser}) => {

    const[list,setList] = useState([{}])
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogOut = () => {
        logOut();
        setUser(null);
        navigate('/');
    }

    const handleCheck = (index) => {
      const newItem = list[index];
      newItem.checked = !newItem.checked;
      const newList = [...list];
      newList[index] = newItem
      setList(newList)
    }

    useEffect(() => {
      if(!user) {
        return navigate("/")
      }
      const getList = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/todolist/${user._id}/mylist`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const list = await response.json();
          setList(list)
        }
        catch(error) {
          setError(error.message)
        }
      }
      getList()
    }, [user])


    return (
        <>
        <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: theme => theme.spacing(4),
          }}
        >
          <img src="/list.jpeg" alt="Logo" width="80" />
          <Typography component="h1" variant="h5" align="center">
            {`${user.username}'s To-Do-List`}
          </Typography>
          
          <Box
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: theme => theme.spacing(3),
          }}
        >
          {list.map((listItem, index) => (
            <ToDoListItem listItem={listItem} key={index} index={index} handleCheck={handleCheck}/>
          ))}
          </Box>

      <Typography
        variant="body2"
        color="error"
        align="center"
      >
        {error}
      </Typography>

            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
                component={Link}
                to="/todolist/add"
            >
                Add To-Do
            </Button>
            <Button
                color="primary"
                variant="outlined"
                sx={{ margin: 2 }}
                onClick={handleLogOut}
            >
                Log Out
            </Button>
        </Box>
        
        </Box>
      </Container>

        </>
    )
}

export default ToDoList