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
   CiSearch } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import UpdateMusic from './UpdateMusic';
import { IoIosClose } from 'react-icons/io';

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

const FilterContainer = styled(Flex)`

  border: 1px solid #ebeced;
    padding: 1rem;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    width: 100%;
gap: 1rem;
`
const FilterButton = styled.select`
display: flex;
align-items: center;
gap:0.5rem;
  border: 1px solid #ebeced;
    padding: 0.25rem 0.5rem;
    border-radius: 2px;
    font-size:14px;
    cursor: pointer;
    justify-self: flex-end;
   

`

const Filters = styled(Flex)`

  align-items: center;
  gap: 1rem;
  color:white;

  font-size: 14px;
  div {
   background: #2f426f;
  padding: 0.25rem 0.5rem;
  border-radius: 4px; 
  display: flex;
  align-items: center;
  gap: 0.5rem;
  }
  div svg {
    cursor: pointer;
  }
  
  
`
const MusicActions = styled(Flex)`
   flex-direction: column;
   gap:12px;
   svg {
    cursor: pointer;
   }
`

const MusicList: React.FC = () => {
  const {musics,status,genres} = useAppSelector(state=>state.music);
  const [showAddMusic,setShowAddMusic] = useState<boolean>(false);
  const [showUpdateMusic,setShowUpdateMusic] = useState<boolean>(false);
  const [updatedMusic,setUpdatedMusic] = useState<Music|null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const dispatch = useAppDispatch()
useEffect(() => {
 dispatch(fetchMusicRequest())
}, [])
const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedGenre = event.target.value;

  if (selectedGenres.includes(selectedGenre)) {
    setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));
  } else {
    setSelectedGenres([...selectedGenres, selectedGenre]);
  }
};

const filteredMusics = musics.filter(
  (music) =>
    music.title?.toLowerCase().includes(searchQuery.toLowerCase())&&
    (selectedGenres.length === 0 || selectedGenres.includes(music.genre || '')) 
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
<FilterContainer>
{/* <FilterButton htmlFor='genreFilter'>

  <CiFilter /> 
</FilterButton> */}
<FilterButton id="genreFilter" value={''} onChange={handleGenreChange}>
        <option value="All">Filter by genre</option>
        {genres.length>0 && genres.filter((genre) => !selectedGenres.includes(genre || '')).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </FilterButton>
      <Filters>
        {selectedGenres.length > 0 && selectedGenres.map((genre) =>(<div key={genre}>
{genre}
<IoIosClose onClick={()=>{setSelectedGenres(selectedGenres.filter((g) => g !== genre));}}/>
        </div>))}
      </Filters>
</FilterContainer>
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
