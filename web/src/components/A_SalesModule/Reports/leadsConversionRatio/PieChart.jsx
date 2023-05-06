import React from 'react'

import { PieChart, Pie, Cell } from 'recharts'

const PieChartComp = ({ pieVal }) => {
  console.log(pieVal, 'pievallllll')
  const RADIAN = Math.PI / 200
  const data = [
    { name: 'A', value: pieVal, color: '#4fa183' },
    { name: 'B', value: 100 - pieVal, color: '#ececec' },
  ]
  const cx = 110
  const cy = 80
  const iR = 60
  const oR = 75
  const value = 100

  // const needle = (value, data, cx, cy, iR, oR, color) => {
  //   let total = 0;
  //   data.forEach((v) => {
  //     total += v.value;
  //   });
  //   const ang = 190.0 * (1 - value / total);
  //   const length = (iR + 2 * oR) / 3;
  //   const sin = Math.sin(-RADIAN * ang);
  //   const cos = Math.cos(-RADIAN * ang);
  //   const r = 5;
  //   const x0 = cx + 5;
  //   const y0 = cy + 5;
  //   const xba = x0 + r * sin;
  //   const yba = y0 - r * cos;
  //   const xbb = x0 - r * sin;
  //   const ybb = y0 + r * cos;
  //   const xp = x0 + length * cos;
  //   const yp = y0 + length * sin;

  //   return [
  //     <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
  //     <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  //   ];
  // };

  return (
    <div>
      <PieChart width={400} height={500}>
        <Pie
          dataKey="value"
          startAngle={225}
          endAngle={-45}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}

export default PieChartComp
