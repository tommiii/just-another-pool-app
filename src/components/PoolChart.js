import React from 'react';
import _ from 'lodash';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const PoolChart = ({
  pool,
}) => {
  const { answersPerUser } = pool;
  const data = _.transform(pool.options, (rusult, value, index) => {
    const countAnswer = _.filter(answersPerUser, item => item.answer === index);
    rusult.push({ text: `Answer ${index + 1}`, value: _.size(countAnswer) });
  }, []);

  return (
    <div className="PoolChart p-3">
      <BarChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="text" />
        <YAxis />
        <Bar dataKey="value" fill="#82ca9d " />
      </BarChart>
    </div>
  );
};

export default PoolChart;
