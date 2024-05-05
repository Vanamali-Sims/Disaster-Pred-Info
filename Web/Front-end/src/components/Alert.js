import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

 
export function Alert({ i1, i2, i3, i4, i5}) {
    const username = localStorage.getItem('userName');
  const [openPopover, setOpenPopover] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
 
  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button variant="text">Alert</Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          {username ? (
            <Button
            variant="gradient"
            size="sm"
            className="font-medium capitalize"
            >
            Send alerts
            </Button>
          ) : <Link to='/'><Button
          variant="gradient"
          size="sm"
          className="font-medium capitalize"
          >
          Login to send alerts
          </Button></Link>}
        </div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 flex items-center gap-2 font-medium"
        >
          <span>{username}</span> •{" "}
          <a href="#" className="text-md font-medium text-gray-900">
            EarthQuakes
          </a>
        </Typography>
        <Typography
          variant="small"
          color="red"
          className="font-normal m-1"
        >
          {i1}
        </Typography>
        <Typography
          variant="small"
          color="red"
          className="font-normal mt-1 mx-1 mb-3"
        >
          {i2}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal m-1 text-blue-gray-500"
        >
          {i3}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal m-1 text-blue-gray-500"
        >
          {i4}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal m-1 text-blue-gray-500"
        >
          {i5}
        </Typography>
      </PopoverContent>
    </Popover>
  );
}