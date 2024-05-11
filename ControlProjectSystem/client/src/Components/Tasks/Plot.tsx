import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import TrackObj from '../Enitities/TrackObj';

interface DemoColumnProps {
  idtask : number;
  refreshFlag : boolean;
}

interface DataItem {
  st: string;
  countH: number;
}

//Компонент отображения графика. переменная data содержит информацию о подписях осей X и Y. Выводится всегда пять столбцов по количеству стадий задания
//Прозводится фильтрация по выбранной стадии и суммирование затреканных часов и запись суммы в data. И так для каждой стадии задания
//Полученные значения формируют data в config, который и отправляется для компонента AntDesign Column 
const DemoColumn: React.FC<DemoColumnProps> = ({idtask, refreshFlag}) => {

  const [tracks, setTracks] = useState<Array<TrackObj>>([]);

  const updateChartData = (tracks: Array<TrackObj>) => {
    const data: DataItem[] = [
      { st: "Analyst", countH: 0 },
      { st: "InProgress", countH: 0 },
      { st: "Review", countH: 0 },
      { st: "Stage", countH: 0 },
      { st: "Test", countH: 0 }, 
    ];

    for (let i = 0; i < 5; i++) {
      const temp = tracks.filter((e) => ((e?.statusTask === data[i].st) && (Number(e?.idTask) === idtask)));
      const sum = temp.reduce((acc, track) => acc + Number(track?.countHours), 0);
      data[i].countH = sum;
    }

    return data;
  };

  const config = {
    data: updateChartData(tracks),
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

  useEffect(() => {
    const getTracks = async () => {
      const requestOptions: RequestInit = {
        method: 'GET'
      };

      await fetch(`api/Tracks`, requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            console.log("DATA GET TRACK");
            console.log(data);
            setTracks(data);
          },
          (error) => console.log(error)
        );
    };

    getTracks();
  }, [refreshFlag]);

  return <Column {...config} />;
};

export default DemoColumn;