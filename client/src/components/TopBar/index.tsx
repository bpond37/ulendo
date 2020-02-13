import React from 'react'
import styled from 'styled-components'
import pen from '../../Icons/pen.svg';
import trashcan from '../../Icons/trashcan.svg';
import MemoStore from '../../stores/memo/MemoStores';
import AuthStore from '../../stores/auth/AuthStore'
import { STORES } from '../../constants';
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
  [STORES.AUTH_STORE] : AuthStore
}

function TopBar (props : InjectedProps & RouteComponentProps){
  const { newMemo, setIndex, deleteMemo, selectedId } = props[STORES.MEMO_STORE]
  const { logout } = props[STORES.AUTH_STORE]
  const { history, } = props
  
  const onClickNew = () => {
    newMemo()
    setIndex()
  }

  const onClickDelete = (id:number) =>{
    deleteMemo(id)
  }

  const handleLogout = () =>{
    console.log('handlelogout')
    logout()
    history.push('/login');
    // checkLogin()
  }

  return(
    <TopBarBlock>
      <TopBarBlock className='header'>
        <h3>ULENDO</h3>
        <Button onClick={onClickNew}>
          <img src={pen} width={13} height={'auto'} alt={'new memo'} />
        </Button>
        <Button onClick={()=>onClickDelete(selectedId)}>
          <img src={trashcan} width={13} height={'auto'} alt={'remove memo'} />
        </Button>

      </TopBarBlock>
        {/* <h1>{auth}</h1> */}
      <Logout onClick={handleLogout}>
        <h4>
          logout
        </h4>
      </Logout>

    </TopBarBlock>
  )
}

export default inject(STORES.MEMO_STORE, STORES.AUTH_STORE)(observer(TopBar))

const Logout = styled.div`
  padding-right: 2rem;
`

const TopBarBlock = styled.div`
  display : flex;
  padding-left : 1rem;
  background : whitesmoke;
  height : 3rem;
  border-bottom : 0.3px solid;
  /* justify-content : center; */
  border-bottom-color :lightgray;
  align-items: center;
  font-family:Arial, Helvetica, sans-serif;
  justify-content:space-between;

  &.header{
    padding-left: 0;
  }
  `

const Button = styled.div`
  background: white;
  border-radius : 4px;
  margin-left : 10px;
  padding-top : 2px;
  width : 40px;
  height : 20px;
  border : 0.5px solid lightgray;
  font-size : 10;
  /* align-items: center; */
  justify-content: center;
  vertical-align: middle;
  text-align : center;
  &:hover{
    background: whitesmoke;
  }
`
