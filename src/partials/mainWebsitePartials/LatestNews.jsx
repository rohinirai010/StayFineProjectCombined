import React, { useState, useEffect } from "react";

import { SecondaryButton } from "../../components/MainWebsiteComponents/ButtonsComponent";
import latestNewsLaptop from "../../images/mainWebsiteImages/latestNewsLaptop.svg"

// NewsCard component with animations
const NewsCard = ({ 
  imageUrl, 
  imageAlt, 
  category, 
  title, 
  description, 
  authorImage, 
  authorName, 
  date,
  index
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // Stagger animation by 200ms per card

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`rounded-4xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
      style={{background: "var(--color-dark)" }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:scale-110">
          <span 
            className="text-xs px-3 py-1 rounded-xl text-white font-medium animate-pulse hover:animate-none transition-all duration-300" 
            style={{ background: "var(--color-primary)" }}
          >
            {category}
          </span>
        </div>
      </div>
              <div className="p-6">
        <h3 className="text-white text-lg font-semibold mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
          {description}
        </p>
        <div className="w-full h-[0.5px]  transition-all duration-300 group-hover:bg-[#E20C88] group-hover:h-[1px]" style={{background: "var(--color-accent)"}}></div>
        <div className="flex items-center mt-5 transition-all duration-300 group-hover:transform group-hover:translate-x-1">
          <img 
            src={authorImage} 
            alt={authorName} 
            className="w-8 h-8 rounded-full mr-3 transition-all duration-300 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-[#E20C88]"
          />
          <div>
            <p className="text-white text-sm font-medium transition-colors duration-300 group-hover:text-[#E20C88]">{authorName}</p>
            <p className="text-gray-400 text-xs transition-colors duration-300 group-hover:text-gray-300">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Animate header first
    const headerTimer = setTimeout(() => {
      setHeaderVisible(true);
    }, 100);

    // Animate button after cards
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, 1000);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // data for the cards
  const newsData = [
    {
      id: 1,
      imageUrl: latestNewsLaptop,
      imageAlt: "Laptop",
      category: "PRODUCTS",
      title: "The Basics about Cryptocurrency",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum consectetur adipiscing elit. Scelerisque viverra donec ullamcorper.",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      authorName: "ALEX TURNER",
      date: "AUGUST 9, 2021"
    },
    {
      id: 2,
      imageUrl: latestNewsLaptop,
      imageAlt: "Laptop",
      category: "PRODUCTS",
      title: "The Basics about Cryptocurrency",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum consectetur adipiscing elit. Scelerisque viverra donec ullamcorper.",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      authorName: "ALEX TURNER",
      date: "AUGUST 9, 2021"
    },
    {
      id: 3,
      imageUrl: latestNewsLaptop,
      imageAlt: "Laptop",
      category: "PRODUCTS",
      title: "The Basics about Cryptocurrency",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum consectetur adipiscing elit. Scelerisque viverra donec ullamcorper.",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      authorName: "ALEX TURNER",
      date: "AUGUST 9, 2021"
    }
  ];

  return (
    <div className="pt-14 md:pt-36 pb-16 px-6 sm:px-8 md:px-10 lg:px-20 xl:px-30">
      <div 
        className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 mb-6 md:mb-10 transform transition-all duration-700 ${
          headerVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}
      >
        <h1 className="text-white text-[25px] sm:text-[35px] md:text-[38px] font-bold relative">
          <span className="bg-gradient-to-r from-[#FFAEDD] via-[#571043] to-[#FFAEDD] bg-clip-text text-transparent animate-gradient-x">
            Browse our latest news
          </span>
        </h1>
        <p className="text-[10px] sm:text-[13px] tracking-wider text-gray-400 transition-colors duration-500 hover:text-gray-300" style={{color: "var(--color-dark)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Sit non neque
          orci amet, amet .
        </p>
      </div>

      {/* middle three cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6 mb-8">
        {newsData.map((news, index) => (
          <NewsCard
            key={news.id}
            index={index}
            imageUrl={news.imageUrl}
            imageAlt={news.imageAlt}
            category={news.category}
            title={news.title}
            description={news.description}
            authorImage={news.authorImage}
            authorName={news.authorName}
            date={news.date}
          />
        ))}
      </div>

      {/* bottom button */}
      <div 
        className={`flex justify-center mt-8 transform transition-all duration-700 ${
          buttonVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0'
        }`}
      >
        <SecondaryButton onClick={() => alert("Primary action!")}>
          View All Articles
        </SecondaryButton>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LatestNews;