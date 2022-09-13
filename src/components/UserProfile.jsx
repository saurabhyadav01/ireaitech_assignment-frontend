import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, FormGroup,  Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link  ,useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UserProfile = () => {
    const navigate=useNavigate();
    const [token,setToken]=useState({token:"",user_id:""})
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  
    mobile:"",
    image:"",
    address:""
  });
  

const {id}=useParams()
console.log(id)
  const getformData = (e) => {
    let { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const EditHandler = () => {
   
    console.log(token.token)
      axios.patch(`http://localhost:5000/users/${id}` , data,{ headers: {"Authorization" : `Bearer ${token.token}`}}).then((res)=>{
        console.log(res.data)
        
        toast.success("User Updated!!",{position:"top-center"})
        setTimeout(() => {
         
        }, 3000);
    }).catch((error)=>{
      if(error.message){
        toast.error("Please Try another email or password",{position:"top-center"})
        console.log(error)
      }
       
    })
    
  };
  
  function profileData()
  {
    axios.get(`http://localhost:5000/users/${id}`).then((res)=>
    {
      let data={
        firstname: res.data.firstname,
    lastname:  res.data.lastname,
    email:  res.data.email,
  
    mobile: res.data.mobile,
    image: res.data.image,
    address: res.data.address
      }
     setData({ ...data});
 
    }).catch((err)=>
    {
      console.log(err)
    })
  }

console.log(data)
 useEffect(()=>{
  profileData()
  const sessionData= JSON.parse(sessionStorage.getItem("user"));
  
  if(sessionData){
   
    setToken({token:sessionData.token,user_id:sessionData.user._id})
  }
  else{
    navigate("/login")
  }

},[])
  return (
    <>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 450,
            height: 500,
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
            User Profile
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              id="firstname"
   label="First Name"
              value={data.firstname}
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
            <TextField
              id="lastname"
              label="Last nMAE"
              value={data.lastname}
              variant="outlined"
              sx={{ marginBottom: "25px" }}
              onChange={getformData}
            />
          </Box>
          <TextField
            id="email"
            label="Email"
            value={data.email}
            disabled="disabled"
            variant="outlined"
            sx={{ marginBottom: "25px" }}
            onChange={getformData}
          />
        
            <TextField
            id="mobile"
            lable="mobile"
            value={data.mobile}
            type="mobile"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
          <TextField
            id="image"
            label="Image link"
            value={data.image}
            
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            onChange={getformData}
          />
            <TextField
            id="address"
            label="Address"
            value={data.address}
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
            onClick={EditHandler}
          >
            Edit your Profile
          </Button>
          <Link to="/register">Create your account</Link>
        </Paper>
      </Box>

      <ToastContainer />
    </>
  );
};