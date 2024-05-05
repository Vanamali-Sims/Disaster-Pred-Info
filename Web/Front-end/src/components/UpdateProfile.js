import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ProfileChanger() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    token : token,
    name: "",
    email: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleOpen = () => setOpen((cur) => !cur);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (formData.name.trim() !== "") {
        localStorage.setItem("userName", formData.name);
      }
  
      // Check if email is not empty and set it to local storage
      if (formData.email.trim() !== "") {
        localStorage.setItem("email", formData.email);
      }

      if (formData.description.trim() !== "") {
        localStorage.setItem("description", formData.description);
      }
      window.location.reload();
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        CHANGE MY PROFILE
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleUpdate}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit your profile
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Modify what you need!
              </Typography>
              <Input
                variant="standard"
                label="New Username"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="lg"
              />
              <Input
                variant="standard"
                label="New email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="lg"
              />
              <Textarea
                variant="standard"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Update
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}

export default ProfileChanger;
