import { Link } from "react-router-dom"
import Slider, { type CustomArrowProps } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import type { Video as VideoType } from "../../../types/VideoTypes"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"
import { VideoThumbnail } from "../Thumbnail/Thumbnail"

interface CarouselProps {
  videos: VideoType[]
  studyId: string;
  teacher: boolean;
}

const NextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="
      absolute top-1/2 -right-10 sm:-right-12 md:-right-14
      -translate-y-1/2
      z-20 bg-white/90 hover:bg-white
      p-2 rounded-full shadow-md text-[#4E81BD] hover:text-[#386095]
      border border-gray-200 hover:border-[#4E81BD]
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-[#4E81BD] focus:ring-offset-2
      backdrop-blur-sm
      group
    "
    aria-label="Ver siguiente video"
  >
    <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
  </button>
)

const PrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="
      absolute top-1/2 -left-10 sm:-left-12 md:-left-14
      -translate-y-1/2
      z-20 bg-white/90 hover:bg-white
      p-2 rounded-full shadow-md text-[#4E81BD] hover:text-[#386095]
      border border-gray-200 hover:border-[#4E81BD]
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-[#4E81BD] focus:ring-offset-2
      backdrop-blur-sm
      group
    "
    aria-label="Ver video anterior"
  >
    <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
  </button>
)

export default function VideoCarousel({ videos, studyId, teacher }: CarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slideCount = videos.length
  const slidesToShow = Math.min(3, slideCount)

  const settings = {
    infinite: slideCount > slidesToShow,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    speed: 500,
    autoplay: false,
    pauseOnHover: true,
    className: "video-carousel",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(2, slideCount) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(2, slideCount) } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  }

  if (videos.length === 0) return null

  // prefijo dinámico
  const basePath = teacher
    ? `/teacher/evaluations/${studyId}/videos`
    : `/student/${studyId}/videos`

  return (
    <div className="w-full mx-auto mb-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Otros videos del estudio</h2>
        <div className="text-sm text-gray-500">
          {activeSlide + 1} de {slideCount}
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative px-10 sm:px-14 md:px-16 overflow-visible">
        <Slider {...settings}>
          {videos.map((video) => {
            const videoPageUrl = `${basePath}/${video.id}`
            return (
              <div key={video.id} className="px-2 sm:px-3 pb-1">
                <Link
                  to={videoPageUrl}
                  className="block group focus:outline-none focus:ring-2 focus:ring-[#4E81BD] focus:ring-offset-2 rounded-lg"
                >
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-[#4E81BD]/50 transition-all duration-200">
                    <VideoThumbnail videoId={video.id} alt="Video" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-center justify-center group-hover:from-black/70 group-hover:to-black/20 transition-all duration-200">
                      <div className="bg-[#4E81BD]/80 p-3 rounded-full transform group-hover:scale-110 transition-all duration-200">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#4E81BD] transition-colors">
                      {video.original_filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(video.upload_date || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
