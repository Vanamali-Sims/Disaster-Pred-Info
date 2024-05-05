import React, { useState } from "react";
import { WEB_LOGO } from "../utils/config";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  Button,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
 
const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleProfileClick = () => {
    return <Alert color="red">An error alert for showing message.</Alert>
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
    
  };
 
  return (
    <>
      <IconButton variant="text" className="text-cyan-300" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="bg-blue-gray-200">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-blue-gray-200 bg-opacity-95"
        >
          <div className="mb-2 flex items-center gap-4 p-4 ">
            <img
              src={WEB_LOGO}
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              DPRMS
            </Typography>
          </div>
          <div className="p-2">
            <Input
              variant="standard"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List className="hover:text-blue-gray-600">
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Predictions
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                <Link to='/forestfires'>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Forest Fires
                  </ListItem></Link>
                  <Link to='/earthquakes'><ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    EarthQuakes
                  </ListItem></Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Response Plans
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Live News
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                <Link to="/nd">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Natural Disasters
                  </ListItem></Link>
                  <Link to='/climate'><ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Climate Change
                  </ListItem></Link>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            {token ? ( 
            <Link to='/profile'>
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>Profile
              </ListItem></Link>
            ) : (
              <Popover placement="right">
              <PopoverHandler>
                <ListItem>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                    Profile
                </ListItem>
              </PopoverHandler>
              <PopoverContent>
              -     Login to access
              </PopoverContent>
            </Popover>
            )}
            <ListItem>
              <ListItemPrefix>
              <svg className="h-5 w-5 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
              </ListItemPrefix>
              About Us
            </ListItem>
            {token && (
              <ListItem onClick={handleLogout}>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            )}
          </List>
              {!token && (
                          <Alert
                          open={openAlert}
                          className="mt-auto"
                          onClose={() => setOpenAlert(false)}
                        >
                          <CubeTransparentIcon className="mb-4 h-12 w-12" />
                          <Typography variant="h6" className="mb-1">
                            Authenticate to use
                          </Typography>
                          <Typography variant="small" className="font-normal opacity-80">
                            Register to use multiple features of DPRMS and make accurate preductions,pinpoint their live locations.
                          </Typography>
                          <div className="mt-4 flex gap-3">
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              className="font-medium opacity-80"
                              onClick={() => setOpenAlert(false)}
                            >
                              Dismiss
                            </Typography>
                            <Typography
                              as="a"
                              href="/signup"
                              variant="small"
                              className="font-medium"
                            >
                              Signup
                            </Typography>
                          </div>
                        </Alert>
              )}
        </Card>
      </Drawer>
    </>
  );
}

export default Sidebar;