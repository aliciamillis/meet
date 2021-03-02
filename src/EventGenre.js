import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const COLORS = ["#cc99ff", "green", "yellowgreen", "tomato", "skyblue"];
  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const data = genres.map((genre) => {
      const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    })
    return data;
  };

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie data={data} cx="47%" cy="50%" labelLine={false} legendType="square" outerRadius={80} fill="#8884d8" datakey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} name={entry.name} />)
          }
        </Pie>
        <Legend layout="horizontal" align="center" verticalAlign="top">

        </Legend>
      </PieChart>
    </ResponsiveContainer>
  );
}


export default EventGenre;