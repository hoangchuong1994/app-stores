export function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Bag body */}
      <rect x="10" y="14" width="44" height="40" rx="12" fill="currentColor" />

      {/* Handle */}
      <path
        d="M22 18C22 13.6 25.6 10 30 10H34C38.4 10 42 13.6 42 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Check / sparkle */}
      <path
        d="M26 34L30.5 38.5L38 30"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
