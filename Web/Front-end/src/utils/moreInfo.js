import { Link } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";

export function MoreInfo({ imageSrc }) {
  return (
    <Popover placement="right">
      <PopoverHandler>
        <Button className="ml-72 text-black" color="white">
          More Info
        </Button>
      </PopoverHandler>
      <PopoverContent className="z-[999] grid w-[28rem] grid-cols-2 overflow-hidden p-0">
        <div className="p-4">
          <Typography color="blue-gray" className="mb-2 text-lg font-bold">
            Nature's Sentinel
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="mb-14 font-normal text-blue-gray-500"
          >
            Wildfires are voracious infernos, consuming everything in their path with relentless fury..Earthquakes, the Earth's mighty tremors, shake the ground with awe-inspiring power.Our website predicts them in future with an accuracy above 95% providing public safety.
            Know the latest updates here.
          </Typography>
          <Link to="/nd" className="-ml-3 inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-x-2 capitalize"
            >
              Live News
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 1.91669L5.33333 6.00002L1.25 10.0834"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="min-h-full !w-full p-3">
          <img
            src={imageSrc}
            alt="image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
