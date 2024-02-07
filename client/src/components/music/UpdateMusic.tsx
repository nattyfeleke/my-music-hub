// src/components/MusicForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { saveMusicAsync } from '../reducers/musicSlice';
import { Music } from '../../types/musicTypes';
import styled from '@emotion/styled';
import {  updateMusicRequest } from '../../reducers/musicSlice';

const MusicFormContainer = styled.div`
 
`;

const FormLabel = styled.label`
  margin-right: 8px;
  margin-bottom: 4px;
  font-size: 14px;
`;

const FormInput = styled.input`
display: block; 
padding: 0.625rem; 
border-radius: 0.125rem; 
border-width: 1px; 
border-color: #D1D5DB; 
width: 100%; 
color: #111827; 
background-color: #F9FAFB; 
margin-bottom: 12px;

`;

const FormButton = styled.button`
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
`;

interface Props {
    music:Music
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const UpdateMusic: React.FC<Props> = ({music,setOpen}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Music>({
    _id:'',
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
useEffect(() => {
if(music) {
const {_id,title,artist,album,genre}= music;
setFormData({
    _id,title,artist,album,genre
})
}},[music])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateMusicRequest({music:formData,setOpen:setOpen}));
    
    setFormData({
        _id:'',
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
  };

  return (
    <MusicFormContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor="title">Title:</FormLabel>
          <FormInput type="text" name="title" required value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="artist">Artist:</FormLabel>
          <FormInput type="text" name="artist" required value={formData.artist} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="album">Album:</FormLabel>
          <FormInput type="text" name="album" required value={formData.album} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="genre">Genre:</FormLabel>
          <FormInput type="text" name="genre" required value={formData.genre} onChange={handleChange} />
        </div>
        <FormButton type="submit">Update Music</FormButton>
      </form>
    </MusicFormContainer>
  );
};

export default UpdateMusic;
