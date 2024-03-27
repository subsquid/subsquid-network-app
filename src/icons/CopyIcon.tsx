import React from 'react';

export function CopyIcon({ size = 20, strokeWidth }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0002 7.83594H9.50016C8.57969 7.83594 7.8335 8.58213 7.8335 9.5026V17.0026C7.8335 17.9231 8.57969 18.6693 9.50016 18.6693H17.0002C17.9206 18.6693 18.6668 17.9231 18.6668 17.0026V9.5026C18.6668 8.58213 17.9206 7.83594 17.0002 7.83594Z"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 12.8333H3.66667C3.22464 12.8333 2.80072 12.6577 2.48816 12.3452C2.17559 12.0326 2 11.6087 2 11.1667V3.66667C2 3.22464 2.17559 2.80072 2.48816 2.48816C2.80072 2.17559 3.22464 2 3.66667 2H11.1667C11.6087 2 12.0326 2.17559 12.3452 2.48816C12.6577 2.80072 12.8333 3.22464 12.8333 3.66667V4.5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
