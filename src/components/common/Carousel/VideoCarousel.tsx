import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Video as VideoType } from "../../../types/VideoTypes";
import { Video as VideoIcon } from "lucide-react";

interface CarouselProps {
  videos: VideoType[];
  studyId: string;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#4E81BD" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#4E81BD" }}
      onClick={onClick}
    />
  );
};

export default function VideoCarousel({ videos, studyId }: CarouselProps) {
    // dynamically adjust slidesToShow and infinite
  const slideCount = videos.length;
  const slidesToShow = Math.min(3, slideCount);
  const settings = {
    infinite: slideCount > slidesToShow,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, slideCount) } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full lg:w-2/3 mb-6">
      <h2 className="text-xl font-semibold mb-2">Otros videos del estudio</h2>
      <Slider {...settings}>
        {videos.map((video) => {
          const videoPageUrl = `/student/${studyId}/videos/${video.id}`;

          return (
            <div key={video.id} className="px-2">
              <Link to={videoPageUrl} className="block">
                <div className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <VideoIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-[#333] truncate">
                  {video.original_filename}
                </p>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
