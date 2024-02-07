
import React from 'react';
import styled from '@emotion/styled';
import {  Flex } from 'rebass/styled-components'; 
import { GiLoveSong } from "react-icons/gi";
import { MdOutlineAlbum  } from "react-icons/md";
import { ArtistStat } from '../../types/dashboardTypes';


const Wrapper = styled(Flex)`
    padding: 0.5rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    color: #2f426f;
   
    font-size:12px;
:hover{
  background-color: #2f426f;
  color: white;
}
    `;
    const StatWrapper = styled(Flex)`
  gap: 1rem;
    `; 
    const Stat = styled(Flex)`
    gap: 0.5rem;
    align-items: center;
    p {
        font-size:12px;
        font-weight: 600;
    }
    `;
    
interface Props {
    artists: ArtistStat[];
}
const Artists:React.FC<Props> = ({artists}) => {
   

  return (<>
  {artists.length>0&& artists.map((artist,index) =>(
    <Wrapper key={index}>
<h3>{artist.name}</h3>
<StatWrapper>
  <Stat>
    <GiLoveSong /> 
    <p>{artist.songsCount}</p>
    </Stat>
    <Stat>
    <MdOutlineAlbum /> 
    <p>{artist.albumsCount}</p>
    </Stat>  
</StatWrapper>

  </Wrapper>
  ))}
  
   </>

  )
}

export default Artists
