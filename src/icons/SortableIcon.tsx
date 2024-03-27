import React from 'react';

export function SortableIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path
          d="M4.24749 2.75232C4.1108 2.61563 3.8892 2.61563 3.75251 2.75232L1.52513 4.9797C1.38844 5.11639 1.38844 5.33799 1.52513 5.47468C1.66181 5.61136 1.88342 5.61136 2.0201 5.47468L4 3.49478L5.9799 5.47468C6.11658 5.61136 6.33819 5.61136 6.47487 5.47468C6.61156 5.33799 6.61156 5.11639 6.47487 4.9797L4.24749 2.75232ZM4.35 12.7998L4.35 2.9998L3.65 2.9998L3.65 12.7998L4.35 12.7998Z"
          fill="#1D1D1F"
        />
        <path
          d="M10.7525 13.0475C10.8892 13.1842 11.1108 13.1842 11.2475 13.0475L13.4749 10.8201C13.6116 10.6834 13.6116 10.4618 13.4749 10.3251C13.3382 10.1884 13.1166 10.1884 12.9799 10.3251L11 12.305L9.0201 10.3251C8.88342 10.1884 8.66181 10.1884 8.52513 10.3251C8.38844 10.4618 8.38844 10.6834 8.52513 10.8201L10.7525 13.0475ZM10.65 3L10.65 12.8L11.35 12.8L11.35 3L10.65 3Z"
          fill="#1D1D1F"
        />
      </g>
    </svg>
  );
}
