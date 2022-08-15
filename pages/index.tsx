import Head from "next/head";
import Image from "next/image";
import { useState, useMemo } from "react";

function Knight() {
  // icon from lichess.org
  return (
    <svg className="scale-[1.5]" width="45" height="45">
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" />
        <path
          d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
          fill="#fff"
        />
        <path
          d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default function Home() {
  const [active, setActive] = useState<[number, number]>([0, 0]);
  // const possiblePositions = useMemo(() => {
  //   const [r, c] = active;
  //   return [
  //     // row forward
  //     [r + 2, c + 1],
  //     [r + 2, c - 1],
  //     //row back
  //     [r - 2, c + 1],
  //     [r - 2, c - 1],
  //     //col forward
  //     [r + 1, c + 2],
  //     [r - 1, c + 2],
  //     //col back
  //     [r + 1, c - 2],
  //     [r - 1, c - 2],
  //   ];
  // }, active);
  function isPossiblePath(x: number, y: number) {
    return (
      (Math.abs(active[0] - x) === 2 && Math.abs(active[1] - y) === 1) ||
      (Math.abs(active[1] - y) === 2 && Math.abs(active[0] - x) === 1)
    );
  }
  function handleClick(e: any) {
    const { r, c } = e.currentTarget.dataset;
    setActive([+r, +c]);
  }
  return (
    <div className="mx-auto max-w-[800px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          className="grid"
          key={i}
          style={{ gridTemplateColumns: "repeat(8 , 1fr)" }}
        >
          {Array.from({ length: 8 }).map((__, j) => (
            <button
              data-r={i}
              data-c={j}
              onClick={handleClick}
              key={i + "-" + j}
              className={`min-w-[100px] min-h-[100px] flex items-center justify-center ${
                (i + j) % 2 ? "bg-black" : "bg-white"
              }`}
            >
              {active[0] === i && active[1] === j && <Knight />}
              {isPossiblePath(i, j) && (
                <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
