import { Link,useRouteError } from "react-router-dom";
import styled from "@emotion/styled";

const Main = styled.main`
  display: grid ;
padding-left: 1.5rem;
padding-right: 1.5rem; 
padding-top: 6rem;
padding-bottom: 6rem; 
place-items: center; 
min-height: 100%; 
background-color: #ffffff; 

@media (min-width: 640px) { 
  padding-top: 8rem;
padding-bottom: 8rem; 
 }

@media (min-width: 1024px) { 
  padding-left: 2rem;
padding-right: 2rem; 
 }
`
const Wrapper = styled.div`
  text-align: center; 

h1 {
  font-size: 1rem;
line-height: 1.5rem; 
font-weight: 600; 
color: #2f426f;
}
h2 {
  margin-top: 1rem; 
font-size: 1.875rem;
line-height: 2.25rem; 
font-weight: 700; 
letter-spacing: -0.025em; 
color: #111827; 

@media (min-width: 640px) { 
  font-size: 3rem;
line-height: 1; 
 }


}
p {
  margin-top: 1.5rem; 
font-size: 1rem;
line-height: 1.5rem; 
line-height: 1.75rem; 
color: #4B5563; 

}
`
const ButtonWrappper = styled.div`
display: flex; 
margin-top: 2.5rem; 
column-gap: 1.5rem; 
justify-content: center; 
align-items: center; 

  a {
    padding-top: 0.625rem;
padding-bottom: 0.625rem; 
padding-left: 0.875rem;
padding-right: 0.875rem; 
border-radius: 0.375rem; 
font-size: 0.875rem;
line-height: 1.25rem; 
font-weight: 600; 
color: #ffffff; 
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
background-color: #2f426f;

  }
`
export default function ErrorPage() {
  const error:any = useRouteError();
 

  return (

    <Main>
    <Wrapper >
      <h1 >404</h1>
      <h2 >Page not found</h2>
      <p> {error.statusText || error.message}</p>
      <ButtonWrappper >
        <Link to="/">Go back home</Link>
      </ButtonWrappper>
    </Wrapper>
  </Main>
  );
}