import React, { memo } from "react";
import "./Wheel.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.32;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   const angle = midAngle >= 90 && midAngle <= 270 ? midAngle + 180 : midAngle;

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="start"
      dominantBaseline="central"
      transform={`rotate(${-midAngle}, ${x}, ${y})`}
    >
      {name}
    </text>
  );
};

const Wheel = ({ innerRef, data, colors }) => {
 console.log("render")

  return (
    <div ref={innerRef} className="wheel">
      {/* {data.map((item, index) => (
        <div key={index} className="wheel__segment">
          <span className="number">{item}</span>
        </div>
      ))} */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
            outerRadius="100%"
            innerRadius="0"
          >
            {data.map((el, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const memoizedWheel = memo(Wheel);

export default memoizedWheel;
