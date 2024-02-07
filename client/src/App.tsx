
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store'
import styled from '@emotion/styled';
import Dashboard from './components/dashboard/Dashboard'
import { Box, Flex } from 'rebass/styled-components'; 
import { GiLoveSong } from "react-icons/gi";
import { MdOutlinePerson,MdOutlineAlbum  } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";

import { getDashboardInfoRequest } from './reducers/dashboardSlice';
import Reports from './components/dashboard/Reports';



const StatWrapper = styled(Flex)`
  margin-top: 1.25rem; 
flex-direction: column; 
gap: 1rem; 


@media (min-width: 768px) { 
  flex-direction: row; 
gap: 2rem; 
 }

`;
const StatItem = styled(Box)`
padding-top: 0.5rem;
/* padding-bottom: 0.25rem;  */
border-radius: 0.25rem; 
width: 100%; 
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 


@media (min-width: 768px) { 
  width: 33.333333%; 
 }

`
const StatContent = styled(Flex)`
padding: 1.25rem; 
justify-content: space-between; 
align-items: center; 
`
const StatData = styled(Flex)`
flex-direction: column;
width: 100%;
gap: 0.5rem;
h3 {
  font-size: 1.5rem;
line-height: 2rem; 
font-weight: 600; 
color: #2f426f;
}
`
const StatTitle = styled(Flex)`

h4 {
  font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 400; 
}
justify-content: space-between;
align-items: center;
`


function App() {

  const {stat,status,task} = useAppSelector(state=>state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardInfoRequest())
  }, [])
  
  return (<>
    <Dashboard>
      {/* Your main content goes here */}
      <h2>Dashboard</h2>
      {status==='loading' && task.includes('stat')? <>Stats Loading ...</> : <StatWrapper>
    
      <StatItem>
        <StatContent>
<StatData>
  <StatTitle >
<h4>Songs</h4>
    <GiLoveSong />
  </StatTitle>
<h3>{stat.totalSongs}</h3>
</StatData>
        </StatContent>
      </StatItem>
      <StatItem>
        <StatContent>
<StatData>
<StatTitle >
<h4>Artists</h4>
<MdOutlinePerson />

</StatTitle>
<h3>{stat.totalArtists}</h3>
</StatData>
        </StatContent>
      </StatItem>
      <StatItem>
        <StatContent>
<StatData>
<StatTitle >
<h4>Albums</h4>
<MdOutlineAlbum  />

</StatTitle>
<h3>{stat.totalAlbums}</h3>
</StatData>
        </StatContent>
      </StatItem>
      <StatItem>
        <StatContent>
<StatData>
<StatTitle >
<h4>Genres</h4>
<TbActivityHeartbeat />

</StatTitle>
<h3>{stat.totalGenres}</h3>
</StatData>
        </StatContent>
      </StatItem>
     </StatWrapper> }
    <Reports />
    
    </Dashboard>
   {/* <MusicList /> */}
   </>

  )
}

export default App
