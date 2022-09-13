import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, FormGroup,  Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link  ,useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const navigate=useNavigate()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile:"",
    image:"",
    address:""
  });

  const getformData = (e) => {
    let { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const RegisterHandler = () => {
    console.log("data",data)
    
      axios.post("https://web-elight.herokuapp.com/register" , data).then((res)=>{
        console.log(res.data)
        
        toast.success("Registered Successfully !!",{position:"top-center"})
        setTimeout(() => {
            navigate("/")
        }, 3000);
    }).catch((error)=>{
      if(error.message){
        toast.error("Please Try another email or password",{position:"top-center"})
        console.log(error)
      }
       
    })
    

  };
 console.log(data)

  return (
    <>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 550,
          },
          justifyContent: "center",
          marginTop: "20px",
          paddingTop:"65px"
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}
          >
            Create your account
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              id="firstname"
              label="First Name"
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
            <TextField
              id="lastname"
              label="Last Name"
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
          </Box>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <TextField
            id="password"
            label="Password (8 character minimum)"
            type="password"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
            <TextField
            id="mobile"
            label="Mobile"
            type="mobile"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
           <TextField
            id="image"
            label="Image"
            type="url"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
            <TextField
            id="address"
            label="address"
            type="text"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
        
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#572afb", color: "white " }}
            onClick={RegisterHandler}
          >
            Create your account
          </Button>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            Have an account? <Link to={`/`}>Sign in</Link>
          </Typography>
        </Paper>
      </Box>

      <ToastContainer />
    </>
  );
};
