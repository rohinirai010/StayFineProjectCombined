import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon, LightBulbIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const AISuggestions = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardsRef = useRef(null);

  // Dummy data for AI suggestions
  const suggestions = [
    {
      id: 1,
      content: "Step 3 has drop-off – Add hint.",
      category: "UX Improvement",
      impact: "high",
      link: "/analytics/funnels/3"
    },
    {
      id: 2,
      content: "Template 4 popular – Recommend by default.",
      category: "Product Enhancement",
      impact: "medium",
      link: "/templates/4/edit"
    },
    {
      id: 3,
      content: "High server load @10AM – Auto-scale option?",
      category: "Infrastructure",
      impact: "high",
      link: "/system/performance"
    },
    {
      id: 4,
      content: "3 clients from UAE pending KYC – Send reminder.",
      category: "Client Management",
      impact: "medium",
      link: "/clients/pending-kyc"
    },
    {
      id: 5,
      content: "PDF watermark feature requested by 5 clients.",
      category: "Feature Request",
      impact: "low",
      link: "/feature-requests"
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
    );
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    if (cardsRef.current) {
      const cardWidth = cardsRef.current.offsetWidth;
      cardsRef.current.scrollTo({
        left: currentCardIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentCardIndex]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div 
        className="flex justify-between items-center p-3 sm:p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200">AI Suggestions</h2>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="relative">
            <div 
              ref={cardsRef}
              className="overflow-hidden"
            >
              <div className="flex transition-transform duration-300 ease-in-out">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={suggestion.id}
                    className={`flex-shrink-0 w-full ${index === currentCardIndex ? '' : 'hidden'}`}
                  >
                    <a
                      href={suggestion.link}
                      className="block p-2 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-start ">
                        <div className="p-[6px] sm:p-2 bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-lg mr-3">
                          <LightBulbIcon className="h-4 sm:h-5 w-4 sm:w-5" />
                        </div>
                        <div className="flex-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getImpactColor(suggestion.impact)}`}>
                            {suggestion.impact}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            {suggestion.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-800 dark:text-white ml-12">
                        "{suggestion.content}"
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex items-center justify-between gap-3 mt-3 space-x-1">
            <button
                onClick={handlePrevCard}
                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous suggestion"
              >
                <ChevronLeftIcon className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
              <div>

              {suggestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3  mr-1 rounded-full ${
                    index === currentCardIndex 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to suggestion ${index + 1}`}
                ></button>

              ))}
              </div>
               <button
                onClick={handleNextCard}
                className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next suggestion"
              >
                <ChevronRightIcon className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
            </div>
            
          </div>
          
          <div className="mt-3 text-center">
            <a href="/ai-insights" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View all AI insights
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;