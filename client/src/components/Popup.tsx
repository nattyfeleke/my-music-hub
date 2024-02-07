import React from 'react';
// import Button from './Button';
import { MdClose } from 'react-icons/md';
import styled from '@emotion/styled'
import { Box, Flex } from 'rebass/styled-components';


const PopupContainer = styled.div<{ open?: boolean }>`
display: none;
background: #8080802e;
overflow: auto;
z-index: 50;
inset: 0px;
position: fixed;
${(props) =>
    props.open &&
    `
     display:block;
    `}
`

const Wrapper = styled(Flex)`
padding: 2.5rem; 
margin: 2.5rem; 
flex-direction: column; 
justify-content: center; 
align-items: center; 
border-radius: 0.25rem; 
background-color: #f8f8f8;
`
const PopupHead = styled(Flex)`
justify-content: space-between; 
align-items: center; 
border-bottom-width: 2px; 
width: 100%; 
`
const PopupBody = styled(Box)`
width: 100%;
margin-top: 2rem;
`
const Button = styled.button`
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

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<Props> = (props: Props) => {

  const { title, children, open, setOpen } = props;


  return (
    <PopupContainer
     open={open}
    >

      <Wrapper >
       
        <PopupHead>
          <h6 style={{ flexGrow: 1 }}>
            {title}
          </h6>
          <Button onClick={()=>{setOpen(false);}} >
          <MdClose />

    </Button>


        </PopupHead>
        <PopupBody >
          <>
            {children}
          </>
        </PopupBody>
      </Wrapper>
    </PopupContainer>
  );
}

export default Popup;
