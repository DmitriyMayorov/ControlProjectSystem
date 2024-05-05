import React from 'react';
import { Column } from '@ant-design/charts';

interface DataItem {
  st: string;
  countH: number;
}

const DemoColumn: React.FC = () => {
  const data: DataItem[] = [
    { st: 'Analyst', countH: 38 },
    { st: 'Code', countH: 52 },
    { st: 'Review', countH: 61 },
    { st: 'Stage', countH: 145 },
    { st: 'Test', countH: 48 },
  ];

  const config = {
    data,
    xField: 'st',
    yField: 'countH',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      st: {
        alias: 'Стадия проекта',
      },
      countH: {
        alias: 'Количество часов',
      },
    },
  };

  return <Column {...config} />;
};

export default DemoColumn;