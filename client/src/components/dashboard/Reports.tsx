import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { Box, Flex } from 'rebass';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Artists from './Artists';
import Albums from './Albums';
import { useAppDispatch, useAppSelector } from '../../store';
import { getDashboardReportRequest } from '../../reducers/dashboardSlice';
import { GenreStat } from '../../types/dashboardTypes';
ChartJS.register(ArcElement, Tooltip, Legend);

 const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Genres',
      },
    },
  };

const ReportsWrapper = styled(Flex)`
  margin-top: 4rem; 
flex-direction: column; 
gap: 1rem; 


@media (min-width: 768px) { 
  flex-direction: row; 
gap: 2rem; 
 }

`;

const DognutChartWrapper = styled(Flex)`
 width: 100%;
 @media (min-width: 768px) { 
  width: 40%;

 }
`;
const SummaryWrapper = styled(Flex)`
 width: 100%;
 flex-direction: column;
 gap: 1rem;
 max-height: 300px;
overflow-y: scroll;

@media (min-width: 768px) { 
  width: 60%;

 }
`;
const Tabs = styled(Flex)`
 gap: 1rem;
`;
const Tab = styled(Box)<{ active?: boolean }>`
 padding: 0.5rem 1rem ;
 cursor: pointer;
 color: #2f426f;
 height: fit-content;
 font-size: 14px;
 font-weight: 600;
 border-radius: 4px;
 ${(props) =>
    props.active &&
    `
    background-color: #c0c6d5;

    `}
`;
const Reports = () => {
const dispatch = useAppDispatch();
const {albums,artists,status,task,genre} = useAppSelector(state=>state.dashboard);
const [genreStat,setGenreStat]= useState<GenreStat>({labels:[],data:[]})

    const [activeTab,setActiveTab] =useState<'artists'|'albums'>('artists');
    useEffect(()=>{
       dispatch(getDashboardReportRequest()) 
    },[])

    useEffect(()=>{
     if(genre)  setGenreStat(genre)
     },[genre])
    const data = {
        labels: genreStat.labels,
        datasets: [{
          label: 'Songs',
          data: genreStat.data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
  return (
    <>
    {status==='loading'&& task.includes('report') ? <>Loading reports...</> : <ReportsWrapper>
      <DognutChartWrapper>

   {genreStat.labels.length>0 &&  <Doughnut options={options} data={data} />}
      </DognutChartWrapper>
      <SummaryWrapper>
<Tabs>
  <Tab active={activeTab==='artists'} onClick={()=>setActiveTab('artists')}>Artists</Tab>
  <Tab active={activeTab==='albums'} onClick={()=>setActiveTab('albums')}>Albums</Tab>
</Tabs>
{activeTab=='artists' && <Artists artists={artists}/>}
{activeTab=='albums' && <Albums albums={albums}/>}
      </SummaryWrapper>
    </ReportsWrapper>}
    
    </>
  )
}

export default Reports