import { Box, Typography, Button} from '@mui/material';
import { useState } from "react";
import { Link } from 'react-router-dom';



const ToDoListItem = ({ listItem, index, handleCheck }) => {

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');

    const ammendDatabase = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/todolist/${listItem._id}/handleChecked`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
      }
      catch(error) {
        setError(error.message)
      }
    }

    const handleToggle = () => {
      handleCheck(index);
      setChecked(!checked);
      ammendDatabase()
    };
  
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = listItem.attachment;
      link.download = listItem.attachmentName;
      link.click();
    };

    return (
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

        }}
      >
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <Typography>{listItem.name}</Typography>
        {listItem.attachment ? 
        <Button
         onClick={handleDownload}
         sx={{
            alignItems: 'flex-end',
        }}
         >
            View 
            </Button>
            :
            <Link to={`/todolist/${listItem._id}/update`}>
                <Button>
                Attach
                </Button>
                </Link>
                }
        <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 3 }}
      >
        {error}
      </Typography>
      </Box>
    );
  };

export default ToDoListItem