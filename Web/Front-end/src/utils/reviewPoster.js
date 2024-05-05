import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ReviewPoster() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [formData, setFormData] = useState({
    review: "",
    rating: "",
    user: id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostComment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/reviews", formData);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text">
        Add a comment
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Post a Comment</DialogHeader>
        <DialogBody>
          <Textarea
            variant="standard"
            label="Your comment"
            rows={8}
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-1 mt-3 w-full"
          />
          <div className="flex w-full justify-between py-1.5">
            <div className="flex gap-2">
              <Button size="sm" color="red" variant="text" className="rounded-md" onClick={handleOpen}>
                Cancel
              </Button>
              <Button size="sm" className="rounded-md" onClick={handlePostComment}>
                Post Comment
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
