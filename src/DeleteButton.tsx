import React from "react";

export default ({
  onClick
}: {
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}) => {
  return (
    <svg
      className="rp-delete"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <g data-name="Layer 2">
        <g data-name="trash-2">
          <rect width="24" height="24" opacity="0" />
          <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0zm0-11.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM16 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0z" />
        </g>
      </g>
    </svg>
  );
};