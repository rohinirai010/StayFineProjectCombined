import React from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Primary button 
export const PrimaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`px-3 md:px-6 py-2 md:py-2.5 text-white rounded-full text-[11px] sm:text-sm md:text-base font-medium hover:opacity-80 transition-opacity cursor-pointer ${className}`}
    style={{ background: 'var(--color-dark)' }}
    {...props}
  >
    {children}
  </button>
);

// Secondary button 
export const SecondaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`px-5 md:px-6 py-2 md:py-2.5  rounded-full text-[11px] sm:text-sm md:text-base font-medium transition-all cursor-pointer ${className}`}
    style={{ 
      color: 'var(--color-white)',
      background: 'var(--color-primary)'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'var(--color-accent)';
      e.target.style.color = 'var(--color-white)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'var(--color-primary)';
      e.target.style.color = 'var(--color-white)';
    }}
    {...props}
  >
    {children}
  </button>
);

export const TertiaryButton = ({ children, className = "", ...props }) => (
  <button
    className={`px-5 md:px-6 py-2 md:py-2.5  rounded-full text-[11px] sm:text-sm md:text-base font-medium transition-all cursor-pointer ${className}`}
    style={{ 
      color: 'var(--color-primary)',
      background: 'var(--color-accent)'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'var(--color-dark)';
      e.target.style.color = 'var(--color-white)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'var(--color-accent)';
      e.target.style.color = 'var(--color-primary)';
    }}
    {...props}
  >
    {children}
  </button>
);

// Outline button variant
export const OutlineButton = ({ children, className = "", ...props }) => (
  <button
    className={`px-6 py-3 rounded-full font-medium transition-all ${className}`}
    style={{ 
      background: 'var(--color-white)',
      color: 'var(--color-primary)',
      borderWidth: '1px',
      borderStyle: 'solid'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'var(--color-primary)';
      e.target.style.color = 'var(--color-white)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'var(--color-white)';
      e.target.style.color = 'var(--color-primary)';
    }}
    {...props}
  >
    {children}
  </button>
);

// Circular play button
export const PlayButton = ({ className = "", ...props }) => (
  <button
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${className}`}
    style={{ 
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)'
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'var(--color-accent)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'var(--color-primary)';
    }}
    {...props}
  >
    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
  </button>
);

// Circular play button (gray variant)
export const PlayButtonGray = ({ className = "", ...props }) => (
  <button
    className={`w-16 h-16 bg-pink-400/30 rounded-full flex items-center justify-center transition-colors ${className}`}
    style={{ 
      color: 'var(--color-white)',
    }}
    onMouseEnter={(e) => {
      e.target.style.borderColor = 'var(--color-primary)';
      e.target.style.color = 'var(--color-primary)';
      e.target.style.borderWidth = '1px';
      e.target.style.borderStyle = 'solid';
    }}
    onMouseLeave={(e) => {
      e.target.style.borderColor = 'transparent';
      e.target.style.color = 'var(--color-white)';
    }}
    {...props}
  >
    <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
  </button>
);

// Pagination button
export const PaginationButton = ({ children, active = false, className = "", ...props }) => (
  <button
    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${className}`}
    style={{
      backgroundColor: active ? 'var(--color-primary)' : 'transparent',
      color: 'var(--color-white)'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.target.style.backgroundColor = 'transparent';
      }
    }}
    {...props}
  >
    {children}
  </button>
);

// Navigation arrow button
export const NavButton = ({ direction = "left", className = "", ...props }) => (
  <button
    className={`w-10 h-10 rounded-lg bg-transparent flex items-center justify-center transition-all ${className}`}
    style={{ 
      borderColor: '#6b7280', 
      color: 'var(--color-white)',
      borderWidth: '1px',
      borderStyle: 'solid'
    }}
    onMouseEnter={(e) => {
      e.target.style.borderColor = 'var(--color-primary)';
      e.target.style.color = 'var(--color-primary)';
    }}
    onMouseLeave={(e) => {
      e.target.style.borderColor = '#6b7280';
      e.target.style.color = 'var(--color-white)';
    }}
    {...props}
  >
    {direction === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
);

// Demo component showing individual usage
const IndividualButtonDemo = () => {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div 
        className="max-w-2xl mx-auto p-8 rounded-lg"
        style={{ 
          backgroundColor: 'rgba(1, 13, 80, 0.2)',
          '--color-primary': '#3B82F6',
          '--color-accent': '#1D4ED8',
          '--color-white': '#FFFFFF',
          '--color-dark': '#1F2937'
        }}
      >
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-white)' }}>
          Individual Button Usage Examples
        </h1>
        
        <div className="space-y-6">
          {/* Example 1: Just NavButton */}
          <div>
            <h3 className="text-lg mb-3" style={{ color: 'var(--color-white)' }}>Navigation Only:</h3>
            <div className="flex space-x-3">
              <NavButton direction="left" onClick={() => console.log('Previous')} />
              <NavButton direction="right" onClick={() => console.log('Next')} />
            </div>
          </div>

          {/* Example 2: Just PrimaryButton */}
          <div>
            <h3 className="text-lg mb-3" style={{ color: 'var(--color-white)' }}>Call to Action:</h3>
            <PrimaryButton onClick={() => alert('Primary action!')}>
              Get Started
            </PrimaryButton>
          </div>

          {/* Example 3: Just PlayButton */}
          <div>
            <h3 className="text-lg mb-3" style={{ color: 'var(--color-white)' }}>Media Control:</h3>
            <PlayButton onClick={() => console.log('Play clicked')} />
          </div>

          {/* Example 4: Pagination with NavButton and PaginationButton */}
          <div>
            <h3 className="text-lg mb-3" style={{ color: 'var(--color-white)' }}>Simple Pagination:</h3>
            <div className="flex items-center space-x-2">
              <NavButton direction="left" />
              <PaginationButton active>1</PaginationButton>
              <PaginationButton>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
              <NavButton direction="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualButtonDemo;