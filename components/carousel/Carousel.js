import Image from 'next/image';
import { createRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const refs = images.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
  };
  const totalImages = images.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };
  return (
    <div className="w-[300px] flex justify-between items-center gap-x-2">
      <div onClick={previousImage} className="cursor-pointer">
        <ArrowBackIosNewIcon />
      </div>
      <div className="carousel">
        {images.map((img, i) => (
          <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
            <Image
              src={img}
              className="w-full object-contain rounded-md"
              width={200}
              height={200}
              alt="image"
            />
          </div>
        ))}
      </div>
      <div onClick={nextImage} className="cursor-pointer">
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default Carousel;
