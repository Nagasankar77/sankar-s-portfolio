import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = 'w-5 h-5',
  size = 20,
  ...props
}) => {
  // Access icon from Lucide
  const IconComponent = (Icons as unknown as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[name];

  if (!IconComponent) {
    const Fallback = Icons.Sparkles;
    return <Fallback className={className} width={size} height={size} {...props} />;
  }

  return <IconComponent className={className} width={size} height={size} {...props} />;
};
