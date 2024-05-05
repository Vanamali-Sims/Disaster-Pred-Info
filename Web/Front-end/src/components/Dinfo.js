import React, { useState, useEffect } from "react";
import { Card,CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
 

function Dcard({ review, rating, user }) {

  return (
    <Card className="mt-6 w-80 mx-4 mb-6 flex flex-col bg-gray-600 text-white bg-opacity-50">
      <CardBody className="flex-grow">
        <Typography variant="h5" color="cyan" className="mb-2">
          {user?.name}
        </Typography>
        <Typography>
          {review}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Rating unratedColor="cyan" ratedColor="cyan" value={parseInt(rating, 10)} readonly/>
      </CardFooter>
    </Card>
  );
}

const Dinfo = () => {

  const [allReviews, setAllReviews] = useState([]);

  useEffect(()=>{
    getReviews();
  },[]);

  async function getReviews() {
    const data = await fetch('http://127.0.0.1:3000/reviews');
    const response = await data.json();
    setAllReviews(response?.data?.reviews);
  }

  return (
    <div className="flex p-2 bg-gray-900 overflow-x-scroll no-scrollbar" style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
      {/* Wrap Dcard components in a container div */}
      <div className="flex">
        <div className="m-5 p-4 text-xl bg-transparent">
          <h1 className="text-cyan-300">Top Reviews</h1>
        </div>
      {allReviews.map((review, index) => {
        return <Dcard key={index} { ...review } />
      })}
      </div>
    </div>
  );
};

export default Dinfo;
