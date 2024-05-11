import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image1 from "../../../assets/promotionImages/image1.jpg";
import Image2 from "../../../assets/promotionImages/image2.jpg";
import Image3 from "../../../assets/promotionImages/image3.jpeg";
import Image4 from "../../../assets/promotionImages/image4.jpeg";
import Image5 from "../../../assets/promotionImages/image5.jpeg";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const promotionImages = [Image1, Image2, Image3, Image4, Image5];

const Banner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseLeave={plugin.current.play}
        onMouseEnter={plugin.current.stop}
      >
        <CarouselContent>
          {promotionImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="w-full h-[200px] md:h-[250px]">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default Banner;
