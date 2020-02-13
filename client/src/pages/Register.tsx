import React,{ useState, ChangeEvent, MouseEvent } from 'react'
import { inject, observer } from 'mobx-react';
import { STORES, PAGE_PATHS } from '../constants'
import styled from 'styled-components'
import palette from '../styles/palette'
import {Link} from 'react-router-dom'
import AuthStore from '../stores/auth/AuthStore'
import { RouteComponentProps } from 'react-router'
import {Helmet} from 'react-helmet'

interface InjectedProps {
  authStore : AuthStore;
}

function Register (props: InjectedProps & RouteComponentProps){

  const { history } = props

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleRegister = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (password.length < 5) {
      alert('비밀번호는 5글자 이상입니다.');
      return false;
    }
    if (email.length < 5) {
      alert('ID는 5글자 이상입니다.');
      return false;
    }
    if (password !== rePassword) {
      alert('입력하신 비밀번호가 비밀번호확인에 입력한 비밀번호와 다릅니다.');
      return false;
    }
    try {
      const result = await props.authStore.register({
        email: email,
        password: password,
      });
      history.push(PAGE_PATHS.SIGNIN);
      alert(result.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
    return false;
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  const onChangeRePassword = (e: ChangeEvent<HTMLInputElement>)=>{
    setRePassword(e.target.value)
  }

  return(
    <>
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <LoginForm>
      <WhiteBox>
        <h1>Sign Up</h1>

        <StyledInput 
          placeholder='Email Address'
          value={email}
          onChange={onChangeEmail}
          ></StyledInput>
        <StyledInput
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder='Password'
          ></StyledInput>
        <StyledInput 
          type="password"
          placeholder='Confirm Password'
          value={rePassword}
          onChange={onChangeRePassword}
        ></StyledInput>
        <StyledButton onClick={handleRegister}>Continue with Email</StyledButton>
        <Link to={PAGE_PATHS.SIGNIN}>Login</Link>
      </WhiteBox>
    </LoginForm>
    </>
  )
}

export default inject(STORES.AUTH_STORE)(observer(Register))


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