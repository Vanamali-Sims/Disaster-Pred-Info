import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyReviews from "./MyReviews";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button} from "@material-tailwind/react";
import { Navbar, Collapse, Typography, IconButton, List, ListItem } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Shimmer from './Showcase';
import ProfileChanger from "./UpdateProfile";
import { ReviewPoster } from "../utils/reviewPoster";
 
function NavList() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    
  };

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <Link to='/'><ListItem className="flex items-center gap-2 py-2 pr-4 text-white">Home</ListItem></Link>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-white">
          Contact Us
        </ListItem>
      </Typography>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem onClick={handleLogout} className="flex items-center gap-2 py-2 pr-4 text-white">Log out</ListItem>
      </Typography>
    </List>
  );
}
 
 function MegaMenuCard() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-gray-900">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-white"
        >
          My Profile
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

  function DescriptionCard() {

    const description = localStorage.getItem('description');

    /*const handleReview = async (e) => {
      e.preventDefault();
      try{
        const data = await axios.post('http://127.0.0.1:3000/reviews',token);
        const response = await data.json();
      }
      catch(error){
        console.log('Error: ',error )
      }
    }*/


    return (
      <Card className="mt-6 w-470">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Description
          </Typography>
          <Typography>
          {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <ReviewPoster />
        </CardFooter>
      </Card>
    );
  }
   
  export function ProfileCard() {

    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        try {
            const formData = {
                token: token
            };

            const response = await axios.delete('http://127.0.0.1:3000/users', {
                data: formData
            });
            console.log(response.data);
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {userName}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {email}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
            <Button>Change my password</Button>
            <ProfileChanger />
        </CardFooter>
        <Button color="red" onClick={handleDelete}>Delete my account</Button>
      </Card>
    );
  }

  export function Profile() {

    const token = localStorage.getItem('token');

    //const [updatedData, setUpdatedData] = useState();

   /* async function getUpdatedData() {
      const response = await axios.post('http://127.0.0.1:3000/', formData);

    }*/



    return (!token) ? <><h1 className=" text-6xl ml-20 mt-10">Unauthorized access</h1><Shimmer /></>: (

        <div className="">
            <div className="m-5">
            <MegaMenuCard /></div>
            <div className="flex mx-32">
                <div className="m-6"><ProfileCard /></div>
                <div>
                    <DescriptionCard />
                    <div className="mt-6">
                    <MyReviews /></div>
                </div>
            </div>
        </div>
    );
  }
  