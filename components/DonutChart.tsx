import React from 'react';

interface DonutChartProps {
  data: {
    people: number;
    planet: number;
    profit: number;
    total: number;
  };
}

const DonutSegment: React.FC<{ radius: number; strokeWidth: number; percentage: number; rotation: number; color: string; }> = ({ radius, strokeWidth, percentage, rotation, color }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <circle
      cx="100"
      cy="100"
      r={radius}
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      transform={`rotate(${rotation} 100 100)`}
      strokeLinecap="round"
    />
  );
};


export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const { people, planet, profit, total } = data;
  
  const peoplePercent = total > 0 ? (people / total) * 100 : 33.3;
  const planetPercent = total > 0 ? (planet / total) * 100 : 33.3;
  const profitPercent = total > 0 ? (profit / total) * 100 : 33.3;

  const profitRotation = -90;
  const peopleRotation = -90 + (profitPercent / 100) * 360;
  const planetRotation = -90 + ((profitPercent + peoplePercent) / 100) * 360;

  const radius = 60;
  const strokeWidth = 30;

  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 200 200" className="transform -rotate-90">
        <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <DonutSegment radius={radius} strokeWidth={strokeWidth} percentage={profitPercent} rotation={profitRotation} color="#a5d6a0" />
        <DonutSegment radius={radius} strokeWidth={strokeWidth} percentage={peoplePercent} rotation={peopleRotation} color="#72bf6a" />
        <DonutSegment radius={radius} strokeWidth={strokeWidth} percentage={planetPercent} rotation={planetRotation} color="#4a9b42" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="absolute" style={{ transform: 'translate(50px, -60px)' }}>
            <div className="bg-gray-700 text-white text-xs font-bold p-1 rounded">
                <div>PROFIT</div>
                <div>{profitPercent.toFixed(0)}%</div>
            </div>
        </div>
        <div className="absolute" style={{ transform: 'translate(-55px, -15px)' }}>
            <div className="bg-gray-700 text-white text-xs font-bold p-1 rounded">
                <div>PEOPLE</div>
                <div>{peoplePercent.toFixed(0)}%</div>
            </div>
        </div>
        <div className="absolute" style={{ transform: 'translate(40px, 60px)' }}>
            <div className="bg-gray-700 text-white text-xs font-bold p-1 rounded">
                <div>PLANET</div>
                <div>{planetPercent.toFixed(0)}%</div>
            </div>
        </div>
      </div>
    </div>
  );
};