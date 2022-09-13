import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import {
  Alert,
  AlertTitle,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export const SignIn = () => {
 const navigate= useNavigate()
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const getformData = (e) => {
    let { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const loginHandler = () => {
     console.log(data)
        axios.post("https://web-elight.herokuapp.com/login" , data).then((res)=>{
        console.log(res.data)
       alert("login In Successfully")
        sessionStorage.setItem("user",JSON.stringify(res.data))
         setTimeout(()=>{navigate(`profile/${res.data.user._id}`)},1000)
    }).catch((error)=>{
      if(error.message){
        toast.error("Please Try another email or password",{position:"top-center"})
        console.log(error)
      }
       
    })
      
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 350,
          },
          justifyContent: "center",
          marginTop: "20px",
          paddingTop:"65px"
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "30px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}
          >
            Sign in here
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
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
            <div>
              <Checkbox /> <span>Keep me signed in</span>{" "}
            </div>
            <Typography
              variant="h6"
              sx={{ fontSize: "14px", marginTop: "9px", marginRight: "10px" }}
            >
              Reset password
            </Typography>
          </Box>
       <Button
            variant="contained"
            sx={{ backgroundColor: "#572afb", color: "white " }}
            onClick={loginHandler}
          >
            Sign in
          </Button>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            or
          </Typography>
         
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              
              marginBottom: "10px",
            }}
          >
            <Link to="/register">Create your account</Link>
          </Typography>
        </Paper>
      </Box>
      <ToastContainer />
    </>
  );
};
