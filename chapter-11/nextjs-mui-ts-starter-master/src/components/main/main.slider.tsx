"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { Box } from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import { useHasMounted } from "@/app/utils/customHook";
import { convertSlugUrl } from "@/app/utils/api";
import Image from "next/image";

export interface IProps {
  data: ITrackTop[];
  title: string;
}

const MainSlider = (props: IProps) => {
  const { data, title } = props;
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <></>;
  }

  const NextArrow = (props: any) => {
    return (
      <Button
        variant="contained"
        color="inherit"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="contained"
        color="inherit"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        margin: "0 50px",
        ".track": {
          padding: "0 10px",

          img: {
            height: 150,
            width: 150,
          },
        },
      }}
    >
      <h2> {title} </h2>

      <Slider {...settings}>
        {data &&
          data.map((song) => (
            <div className="track" key={song._id} >
              <div className="imgaes-track" style={{ position: "relative", width: "100%", height: "150px" }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${song.imgUrl}`}
                  alt=""
                  // width={500}
                  // height={500}
                  fill
                  style={{
                    objectFit: 'cover', // cover, contain, none
                  }}
                ></Image>
              </div>
              <Link
                href={`/track/${convertSlugUrl(song.title)}-${song._id}.html?audio=${song.trackUrl}`}
                style={{ color: "unset", textDecoration: "none" }}
              >
                <h4>{song.title}</h4>
              </Link>
              <h5>{song.description}</h5>
            </div>
          ))}
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
