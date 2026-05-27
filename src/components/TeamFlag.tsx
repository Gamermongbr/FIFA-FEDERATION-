/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TeamFlagProps {
  iso2?: string;
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function TeamFlag({ iso2, name, className = '', size = 'md' }: TeamFlagProps) {
  const sizeClasses = {
    xs: 'h-3 w-5 rounded-tr-[4px] rounded-bl-[4px]',
    sm: 'h-5 w-8 rounded-tr-[8px] rounded-bl-[8px]',
    md: 'h-8 w-14 rounded-tr-[16px] rounded-bl-[16px]',
    lg: 'h-12 w-20 rounded-tr-[24px] rounded-bl-[24px]',
    xl: 'h-16 w-28 rounded-tr-[32px] rounded-bl-[32px]',
  };

  if (!iso2) {
    return (
      <div className={`${sizeClasses[size]} bg-white/10 flex items-center justify-center text-[10px] font-black italic text-white/20 border border-white/5 ${className}`}>
        TBD
      </div>
    );
  }

  // We use FlagCDN for high-quality flat flags.
  const flagUrl = `https://flagcdn.com/w160/${iso2.toLowerCase()}.png`;

  return (
    <div 
      className={`relative inline-block overflow-hidden border border-white/20 shadow-xl group ${sizeClasses[size]} ${className} bg-black`}
      title={name}
    >
      <img 
        src={flagUrl} 
        alt={`${name} flag`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      
      {/* Heavy professional diagonal rounding overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
}
