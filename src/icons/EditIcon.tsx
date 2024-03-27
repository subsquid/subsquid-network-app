import React from 'react';

export function EditIcon({ size = 20, color = '#384955' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4156_5672)">
        <path
          d="M15 1.66406L18.3333 4.9974"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25033 17.0807L15.8337 7.4974L12.5003 4.16406L2.91699 13.7474L1.66699 18.3307L6.25033 17.0807Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4156_5672">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
