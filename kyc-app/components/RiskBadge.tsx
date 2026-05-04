import React from 'react';

interface RiskBadgeProps {
  level: string;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  let bgColor = 'bg-gray-100 text-gray-800';
  
  if (level === 'BAJO') {
    bgColor = 'bg-green-100 text-green-700';
  } else if (level === 'MEDIO') {
    bgColor = 'bg-yellow-100 text-yellow-700';
  } else if (level === 'ALTO') {
    bgColor = 'bg-red-100 text-red-700';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor}`}>
      {level}
    </span>
  );
}
