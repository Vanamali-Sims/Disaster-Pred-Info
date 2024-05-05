import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import axios from "axios";

function Dcard({ review, rating, user }) {

  return (
    <Card className="mt-6 mx-4 mb-6 flex flex-col bg-gray-600 bg-opacity-50" style={{ width: "350px" }}>
      <CardBody className="flex-grow">
        <Typography variant="h5" color="black" className="mb-2">
          {user?.name}
        </Typography>
        <Typography className="text-black">
          {review}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Rating unratedColor="pink" ratedColor="pink" value={parseInt(rating, 10)} readonly/>
        <Button className="ml-10" variant="text">Delete it</Button>
      </CardFooter>
    </Card>
  );
}

const MyReviews = () => {

  const [allReviews, setAllReviews] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(()=>{
    getReviews();
  },[]);


  async function getReviews() {
    const data = await fetch('http://127.0.0.1:3000/reviews');
    const response = await data.json();
    setAllReviews(response?.data?.reviews);
  }

  return (
    <div className="flex p-2  rounded-lg overflow-x-scroll no-scrollbar" style={{ width: "850px" }}>
      {/* Wrap Dcard components in a container div */}
      <div className="flex">
      {allReviews.map((review, index) => {
        return <Dcard key={index} { ...review } />
      })}
      </div>
    </div>
  );
};

export default MyReviews;
