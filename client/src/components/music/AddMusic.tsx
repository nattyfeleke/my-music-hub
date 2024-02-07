// src/components/MusicForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { saveMusicAsync } from '../reducers/musicSlice';
import { NewMusic } from '../../types/musicTypes';
import styled from '@emotion/styled';
import { addMusicRequest } from '../../reducers/musicSlice';

const MusicFormContainer = styled.div`
 
`;
const Form = styled.form`
  max-width: 420px;
`;
const FormLabel = styled.label`
  display: block; 
margin-bottom: 0.5rem; 
font-size: 0.75rem;
line-height: 1.25rem; 
font-weight: 500; 
color: #5c646f; 
`;

const FormInput = styled.input`
display: block; 
padding: 0.5rem; 
border-radius: 0.1255rem; 
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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const AddMusic: React.FC<Props> = ({setOpen}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<NewMusic>({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addMusicRequest({music:formData,setOpen:setOpen}));
    
    setFormData({
      title: '',
      artist: '',
      album: '',
      genre: '',
    });
  };

  return (
    <MusicFormContainer>
      <Form onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor="title">Title</FormLabel>
          <FormInput type="text" name="title" required value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="artist">Artist</FormLabel>
          <FormInput type="text" name="artist" required value={formData.artist} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="album">Album</FormLabel>
          <FormInput type="text" name="album" required value={formData.album} onChange={handleChange} />
        </div>
        <div>
          <FormLabel htmlFor="genre">Genre</FormLabel>
          <FormInput type="text" name="genre" required value={formData.genre} onChange={handleChange} />
        </div>
        <FormButton type="submit">Add Music</FormButton>
      </Form>
    </MusicFormContainer>
  );
};

export default AddMusic;
