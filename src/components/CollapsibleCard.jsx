import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './Card';

export const CollapsibleCard = ({
  title,
  description,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  className = '',
}) => {
  return (
    <Card className={`w-full transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader 
        className="cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            {isOpen ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </div>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-4 transition-all duration-300">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default CollapsibleCard;