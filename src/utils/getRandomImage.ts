import postImage from "../assets/space.jpeg"; // Example image from assets
import postImage2 from "../assets/nature.jpeg";
import postImage3 from "../assets/health.jpeg";
import postImage4 from "../assets/football.jpeg";
import postImage5 from "../assets/egypt.jpeg";
import postImage6 from "../assets/history.jpeg";

export const getRandomImage = () => {
  const images = [
    postImage,
    postImage2,
    postImage3,
    postImage4,
    postImage5,
    postImage6,
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
