// Dashboard.tsx
import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import {Toaster} from 'sonner'
import { LuLayoutDashboard,LuMusic4 } from "react-icons/lu";

interface DashboardProps {
  children: React.ReactNode;
}

const Sidebar = styled(Box)`
  width: 100px;
  background-color: #f8f8f8;
  color: #2f426f;
  padding: 10px;
  font-size: 16px;
  @media (min-width: 520px) { 
    width: 200px;
  padding: 20px;

 }
`;

const MainContent = styled(Box)`
  flex: 1;
  padding: 20px;
`;

const DashboardWrapper = styled(Flex)`
  height: 100vh;
`;
const Nav = styled(Flex)`
margin-top: 1rem;
  flex-direction: column;
  gap: 0.5rem;
 
`;
const StyledLink = styled(Box)<{ variant?: string }>`

  a {
    color: #5c646f ;
    padding: 0.5rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    font-size: 12px;

  }
  @media (min-width: 520px) { 
    a {
      justify-content: flex-start;
      flex-direction: row; 
      gap: 0.5rem; 
      font-size: 14px;
    }
 }
  ${(props) =>
    props.variant === 'active' &&
    `
      a {
        background-color: #ebeced;
        color: #2f426f;
      }
    `}
`;
const Logo = styled(Flex)`
 align-items:center;
 justify-content: center;
 a {
    color: #2f426f ;
    display: none;
  }
  a#logo-small {
      display: block;
      font-size: 16px;
    }
  @media (min-width: 520px) { 
    a {
      display: block;
    }
    a#logo-small {
      display: none;
    }
 }
`; 
const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    const location = useLocation();
  return (<>
 
    <DashboardWrapper>
      <Sidebar >
        <Logo>

        <Link to={'/'}><h2>MyMusic Hub</h2></Link>
        <Link to={'/'} id='logo-small'><h2>MH</h2></Link>
        </Logo>
<Nav>

      <StyledLink variant={location.pathname === '/' ? 'active' : ''}><Link to={'/'} > <LuLayoutDashboard/> Dashboard</Link></StyledLink>  
      <StyledLink variant={location.pathname.startsWith('/musics') ? 'active' : ''}> <Link to={'/musics'}><LuMusic4 /> Musics</Link></StyledLink> 
</Nav>
      </Sidebar>
      <MainContent>
        {/* Main content goes here */}
        {children}
      </MainContent>
    </DashboardWrapper> 
    <Toaster />
    </>
  );
};

export default Dashboard;
