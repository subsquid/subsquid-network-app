export function DocumentIcon({ size = 24, fill = '#A0A1A6' }: { size?: number; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4.47615C4 3.21378 5.02335 2.19043 6.28571 2.19043H11.7143C11.8721 2.19043 12 2.31835 12 2.47614V7.90472C12 9.16708 13.0233 10.1904 14.2857 10.1904H19.7143C19.8721 10.1904 20 10.3183 20 10.4761V20.4761C20 21.7385 18.9767 22.7619 17.7143 22.7619H6.28571C5.02335 22.7619 4 21.7385 4 20.4761V4.47615Z"
        fill={fill}
      />
      <path
        d="M13.1426 7.90472V2.8802C13.1426 2.62566 13.4503 2.49818 13.6303 2.67817L19.512 8.55983C19.692 8.73982 19.5645 9.04757 19.3099 9.04757H14.2854C13.6543 9.04757 13.1426 8.5359 13.1426 7.90472Z"
        fill={fill}
      />
    </svg>
  );
}
