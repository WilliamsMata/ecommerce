import { FC } from "react";
import { Slide } from "react-slideshow-image";

import styles from "./ProductSlideshow.module.css";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: { url: string }[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
      easing="ease"
      autoplay={false}
      indicators
      pauseOnHover={true}
      transitionDuration={500}
    >
      {images.map((image) => {
        return (
          <div className={styles["each-slide"]} key={image.url}>
            <div
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
