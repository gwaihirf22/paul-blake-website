// components/Logo.js
export default function Logo() {
    return (
      <>
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
          aria-hidden="true"
          focusable="false"
        >
          {/* We group each part to animate them separately */}
          <g id="left-bracket">
            {/* Brackets are thinner (stroke 6) and more acute */}
            <path d="M23 25 L-10 50 L23 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g id="right-bracket">
            <path d="M80 25 L112 50 L80 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          
          {/* --- Corrected and Redesigned Chi-Rho --- */}
          <g id="chi-rho">
            {/* Main vertical stem of the Rho (taller) */}
            <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            
            {/* The two diagonal lines of the Chi (repositioned lower) */}
            <path d="M35 45 L65 75" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path d="M65 45 L35 75" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
  
            {/* The open loop of the Rho, drawn with a curve */}
            <path 
              d="M50 10 C 70 10, 70 40, 50 40"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none" // Ensure the loop is not filled in
            />
          </g>
        </svg>
  
        <style jsx>{`
          .logo-svg {
            margin-right: 17px;
            color: var(--color-accent);
            transition: color 0.2s ease;
            overflow: visible; /* Allows the taller P to not be clipped */
          }
  
          /* Define the bounce animation */
          @keyframes slightBounce {
            0%, 100% {
              transform: translateY(0);
            }
            65% {
              transform: translateY(15px);
            }
          }
  
          /* Apply animations on hover of the parent link */
          :global(.brand-link:hover) #chi-rho {
            animation: slightBounce 0.6s ease-in-out;
          }
          :global(.brand-link:hover) #left-bracket {
            animation: slightBounce 0.7s ease-in-out 0.08s;
          }
          :global(.brand-link:hover) #right-bracket {
            animation: slightBounce 0.8s ease-in-out 0.16s;
          }
        `}</style>
      </>
    );
  }