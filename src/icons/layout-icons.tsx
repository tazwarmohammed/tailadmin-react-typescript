// Custom SVG components for layout toggle buttons

export const SidebarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect 
      x="1.5" 
      y="2.5" 
      width="13" 
      height="11" 
      rx="1.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M5.5 2.5v11" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
  </svg>
);

export const HamburgerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2.5 4h11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M2.5 8h11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M2.5 12h11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);
