// components/ImageCarousel.js
import React from "react";
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArrowLeft = (props) => (
    <div
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow p-2"
        onClick={props.onClick}
    >
        <FaChevronLeft className="text-gray-700" />
    </div>
);

const ArrowRight = (props) => (
    <div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white rounded-full shadow p-2"
        onClick={props.onClick}
    >
        <FaChevronRight className="text-gray-700" />
    </div>
);

const ImageCarousel = ({ imageUrls }) => {
    // אם אין בכלל תמונות
    if (!imageUrls) return null;

    // אם זו מחרוזת אחת – תהפוך למערך
    if (typeof imageUrls === "string") {
        imageUrls = [imageUrls];
    }

    // אם רק תמונה אחת – אל תשתמש ב־Slider
    if (imageUrls.length === 1) {
        return (
            <img
                src={imageUrls[0]}
                alt="תמונה"
                className="rounded-xl w-full h-52 object-cover mb-3"
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        rtl: true,
        nextArrow: <ArrowRight />,
        prevArrow: <ArrowLeft />,
        // appendDots: dots => (
        //     <div className="mt-2">
        //         <ul className="bottom-8 flex justify-center space-x-2 rtl:space-x-reverse">{dots}</ul>
        //     </div>
        // ),
        // appendDots: dots => (
        //     <div className="absolute bottom-0 w-full flex justify-center z-10 pb-2">
        //         <ul className="flex gap-2">{dots}</ul>
        //     </div>
        // ),
        customPaging: i => (
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
        )
    };

    return (
        <div className="relative">
            <div className="relative h-52 overflow-hidden rounded-xl">
                <Slider {...settings}>
                    {imageUrls.map((url, i) => (
                        <div key={i}>
                            <img
                                src={url}
                                alt={`תמונה ${i + 1}`}
                                className="w-full h-52 object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>


    );
};

export default ImageCarousel;
