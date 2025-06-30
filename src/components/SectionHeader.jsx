import React from 'react';

const SectionHeader = ({ title }) => {
  return (
    <div className="flex items-center gap-4 mb-4 group">
      <div className="flex items-center gap-1">
        <div className="h-5 w-1 bg-gradient-to-b from-amber-800  via-amber-400  to-amber-100  rounded-full shadow-lg shadow-blue-600" />
        <div className="h-3 w-1 bg-gradient-to-b from-amber-800  via-amber-400  to-amber-100  rounded-full shadow-lg shadow-blue-600" />
        <div className="h-2 w-1 bg-gradient-to-b from-amber-800  via-amber-400  to-amber-100  rounded-full shadow-lg shadow-blue-600" />
      </div>
      <h2 className="text-base font-medium relative">
        {title}
        <div className="absolute -bottom-1 left-0 w-1/4 h-0.5 bg-gradient-to-r from-primary to-transparent group-hover:w-1/3 transition-all duration-300 ease-out" />
      </h2>
      <div className="hidden md:flex items-center gap-1.5 ml-auto">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default SectionHeader;