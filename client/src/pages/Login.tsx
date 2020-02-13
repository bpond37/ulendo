import React,{ useEffect, ChangeEvent, MouseEvent } from 'react'
import { inject, observer } from 'mobx-react';
import { STORES, PAGE_PATHS } from '../constants'
import styled from 'styled-components'
import palette from '../styles/palette'
import {Link} from 'react-router-dom'
import AuthStore from '../stores/auth/AuthStore'
import { RouteComponentProps } from 'react-router'
import {Helmet} from 'react-helmet'

interface InjectedProps {
  [STORES.AUTH_STORE] : AuthStore;
}

function Login (props: InjectedProps & RouteComponentProps){
  
  const {authStore, history} = props

  useEffect(() => {
    authStore.resetPasswordAndEmail();
  }, [authStore]);

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await authStore.login();
      history.push(PAGE_PATHS.EDITER);
    } catch (err) {
      alert(err);
    }
  };
  
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>{
    authStore.setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    authStore.setPassword(e.target.value)
  }

  return(
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <LoginForm>
      <WhiteBox>
        <h1>Log In</h1>
        <StyledInput 
          placeholder='Email Address'
          value={authStore.email}
          onChange={onChangeEmail}
        />
        <StyledInput 
          type="password"
          placeholder='Password'
          value={authStore.password}
          onChange={onChangePassword}
        />
        <StyledButton onClick={handleLogin}>
          Login with Email
        </StyledButton>
        <Link to={PAGE_PATHS.SIGNUP}>
          Sign Up
        </Link>
      </WhiteBox>
    </LoginForm>
    </>
  )
}

export default inject(STORES.AUTH_STORE)(observer(Login));


const LoginForm = styled.div`
  position :absolute;
  left: 0;
  top: 0;
  bottom : 0;
  right: 0;
  /* background : ${palette.gray[2]}; */
  /* flex 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    text-align:center;
    margin : 0;
    color : ${palette.gray[8]};
    margin-bottom : 1rem;
  }
`

const StyledButton = styled.button`
  display:flex;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  margin-top: 1rem;
  justify-content:center;
  cursor: pointer;
  
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
`

const WhiteBox = styled.div`
  .logo-area{
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  /* box-shadow: 0 0 8px rgba(0,0,0,0.025); */
  text-align:right;
  /* justify-content: right; */
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`

const StyledInput = styled.input`
  background: ${palette.gray[1]};
  font-size:1rem;
  border:none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  outline:none;
  width:100%;
  &:focus{
    color:${palette.gray[7]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  &+&{
    margin-top: 1rem;
  }
`