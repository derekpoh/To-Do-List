import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const AddToDoItem = ({user}) => {
  
    const [form, setForm] = useState({
        owner: user?._id,
        name: '',
        attachment: '',
        attachmentName: ''
      });
      const [error, setError] = useState('');
      const navigate = useNavigate();

      useEffect(() => {
        if(!user) {
          return navigate("/")
        }
      }, [user])
    
      const handleChange = (evt) => {
        setForm({ ...form, [evt.target.name]: evt.target.value });
        setError('');
      }
    
      const handleSubmit = async(evt) => {
        evt.preventDefault();
        try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/todolist/add", {
            method: "POST",
            headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            navigate("/todolist")
        } else {
            throw new Error("Failed to add new item");
        }
        } catch(error) {
          setError(error.message);
        }
      }

      const convertToBase64 = (file) => {
        return new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
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
     <Typography component="h1" variant="h5" align="center">
        Add To-Do-Item
     </Typography>
      <TextField
        label="name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <input
      type='file'
      name='attachment'
      onChange={async (event) => {
        if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        const maxSize = 1024 * 1024;
        if (file.size > maxSize) {
          setError('File size exceeds the maximum allowed limit of 1 MB');
          event.target.value = "";
          return;
        }
        const base64 = await convertToBase64(file)
        setForm({...form, attachment: base64, attachmentName: event.target.files[0].name})
      }
      }}
      style={{ marginLeft: 57}}
      ></input>

      <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
        component={Link}
        to="/todolist"
      >
        Back
      </Button>
      </Box>

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

export default AddToDoItem