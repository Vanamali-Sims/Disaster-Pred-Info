import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

//axios.defaults.withCredentials = true;

function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [errorMessage, setErrorMessage] = useState('');
  // Login authentication code
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    name : '',
    email: '',
    // Add more form fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3000/users/login', formData);

      const data = response.data;
      console.log(data);

      // Store the JWT token in localStorage
      localStorage.setItem('token', data?.token);
      localStorage.setItem('userName', data?.data?.user?.name);
      localStorage.setItem('email', data?.data?.user?.email);
      localStorage.setItem('id', data?.data?.user?._id);
      localStorage.setItem('description', data?.data?.user?.description);
      // Print the token from localStorage
      console.log(localStorage.getItem('id'));

      // Update UI or redirect to authenticated route
      setSubmitMessage(`Welcome, ${data?.data?.user?.name}!`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error?.response?.data?.message)
    }
  };

  return (
    <>
      <Button className="text-cyan-300 border-2 border-cyan-300 hover:text-gray-900 hover:bg-cyan-300" onClick={handleOpen}>Sign In</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSignIn}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="h5"
                color="gray"
              >
                Enter your email and password to Sign In.
              </Typography>
              <Input variant="standard" color="blue"  size="lg" label="Email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
              <Input variant="standard" color="blue"  size="lg" label="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Sign In
              </Button>
              <span className="text-red-800">{errorMessage}</span>
              <Typography variant="small" className="mt-4 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="/signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}

export default Login;
