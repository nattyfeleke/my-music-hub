// src/components/MusicList.tsx
import React, { useEffect, useState } from 'react';
import {  useAppDispatch, useAppSelector } from '../../store';
import { Music } from '../../types/musicTypes';
import styled from '@emotion/styled';
import { deleteMusicRequest, fetchMusicRequest } from '../../reducers/musicSlice';
import {Box, Button, Card, Flex} from 'rebass/styled-components'
import Popup from '../Popup';
import AddMusic from './AddMusic';
import { CiEdit,
  //  CiFilter, 
   CiSearch } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import UpdateMusic from './UpdateMusic';

const MusicListContainer = styled.div`
h2 {
    margin-bottom: 20px;

}
`;
const MusicListWrapper = styled.div`
  border: 1px solid #ebeced;
  border-radius: 4px;
  width: 100%;
`;
const List = styled(Box)`
    padding: 10px;
`
const MusicItem = styled(Flex)`
    justify-content: space-between;
    background-color: #f8f8f8; 
    padding: 10px;
    margin-bottom: 8px;

`
const MusicDetail = styled(Card)`
  
  
  display: flex;
  flex-direction: column;

  gap: 4px;
  h1 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
  }
  p span {
    font-weight: 600;
    background-color: transparent;
  }
  span {
    background-color: #ebeced;
    padding: 2px 4px;
    border-radius: 2px;
    width: fit-content;
    font-size: 12px;
  }
  
`;
const AddButton = styled(Button)`
    display: inline-flex; 
padding: 0.625rem  1.25rem;
margin-right: 0.5rem; 
margin-bottom: 1rem; 
align-items: center; 
border-radius: 0.25rem; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 500; 
text-align: center; 
color: #ffffff; 
background-color: #2f426f;
cursor: pointer;
`
const SearchBarContainer = styled(Box)`
  position: relative;
`

const SearchResult = styled(Box)`
margin: 0.5rem 0;
h3{
  font-weight: 500;
  font-size: 16px;
}
`
const SearchBarIcon = styled(Box)`
  display: flex; 
position: absolute; 
top: 0;
bottom: 0; 
left: 8px;
align-items: center; 
`
const SearchBar = styled.input`
  display: block; 
padding: 1rem 2rem; 
border-radius: 4px;
border-width: 1px; 
border-color: #D1D5DB; 
width: 100%; 
font-size: 0.875rem;
line-height: 1.25rem; 
color: #111827; 
background-color: #F9FAFB; 
margin: 1rem 0;
`

// const FilterContainer = styled(Flex)`
//   margin: 1rem 0;
// `
const MusicActions = styled(Flex)`
   flex-direction: column;
   gap:12px;
   svg {
    cursor: pointer;
   }
`

const MusicList: React.FC = () => {
  const {musics,status} = useAppSelector(state=>state.music);
  const [showAddMusic,setShowAddMusic] = useState<boolean>(false);
  const [showUpdateMusic,setShowUpdateMusic] = useState<boolean>(false);
  const [updatedMusic,setUpdatedMusic] = useState<Music|null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useAppDispatch()
useEffect(() => {
 dispatch(fetchMusicRequest())
}, [])
const filteredMusics = musics.filter(
  (music) =>
    music.title?.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (<> <MusicListContainer>
      <h2>My Musics</h2>
<AddButton onClick={()=>setShowAddMusic(true)}>Add new</AddButton>
<SearchBarContainer>
<SearchBarIcon >
           <CiSearch />
        </SearchBarIcon>
            <SearchBar type="search" placeholder="Search songs by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
            
            />
</SearchBarContainer>
{/* <FilterContainer>
  <CiFilter /> 
</FilterContainer> */}
   {searchQuery && <SearchResult>
   <h3>Search Results ( {filteredMusics.length} songs )</h3>
   </SearchResult>}
<MusicListWrapper>
    {status==='loading' ?<><div >Loading...</div></> :<List>
        {filteredMusics.map((music) => (
          <MusicItem key={music._id}>
            <MusicDetail>

           
            <h1>{music.title}</h1>
             <p>Artist: <span>{music.artist}</span></p>  
             <span>{music.genre}</span>
 </MusicDetail>
 <MusicActions>
 <CiEdit onClick={()=>{
    setShowUpdateMusic(true)
    setUpdatedMusic(music)
 }} />
<MdOutlineDeleteOutline onClick={()=>{dispatch(deleteMusicRequest(music._id))}} />
 </MusicActions>
          </MusicItem>
        ))}
      </List>}
</MusicListWrapper>
      
      
    </MusicListContainer>
    <Popup  title="Add music"
        open={showAddMusic}
        setOpen={setShowAddMusic}>
<AddMusic setOpen={setShowAddMusic} />
    </Popup>
    {updatedMusic && <Popup  title="Update music"
        open={showUpdateMusic}
        setOpen={setShowUpdateMusic}>
<UpdateMusic music={updatedMusic} setOpen={setShowUpdateMusic} />
    </Popup>}
    
  </>
   
  );
};

export default MusicList;
