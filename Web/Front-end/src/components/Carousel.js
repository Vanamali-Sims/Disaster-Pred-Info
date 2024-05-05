import React from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import DisasterData from "../utils/config";
import { Link } from "react-router-dom";
 
const CarouselSection = ({name, imageCdn, Description, latestLiveNews, explore}) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToTop();
  }, []);

  return(
    <div className="relative h-full w-full">
    <img src={imageCdn} alt="image"
      className="h-full w-full object-cover"/>
    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
      <div className="w-3/4 text-center md:w-2/4">
        <Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl">{name}
        </Typography>
        <Typography variant="lead" color="white" className="mb-12 opacity-80">{Description}</Typography>
        <div className="flex justify-center gap-2">
          <Link to={explore}><Button size="lg" color="white" onClick={scrollToTop}>Explore</Button></Link>
          <Link to={latestLiveNews}><Button size="lg" color="white" variant="text" onClick={scrollToTop}>Latest news</Button></Link>
        </div>
      </div>
    </div>
  </div>
  );
}

const DisastersCarousel = () => {
  return (
    <Carousel className="xl h-[650px]">
      {DisasterData.map((disaster) => {
        return <CarouselSection key={disaster.id} {...disaster} />
      })}
    </Carousel>
  );
}

export default DisastersCarousel;