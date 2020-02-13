import React,{useEffect} from 'react'
import styled from 'styled-components'
import { STORES } from '../../../constants';
import MemoStore from '../../../stores/memo/MemoStores';
import {inject, observer} from 'mobx-react'
import Memo from './Memo'
import {ISOStringToJsDate} from '../../utils'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
}

function Memos (props:InjectedProps){

  const {memos, getMemoById, selectedId, getMemoList} = props[STORES.MEMO_STORE]
  
  useEffect(()=>{
    console.log("useEffect...")
    getMemoList()

  },[])

  const selectMemo = (id:number) => {
    getMemoById(id)
    // setIndex()
    
  }

  return(
    <MemosBlock>
      {memos.slice(0).sort((a,b) => ISOStringToJsDate(b.updatedAt) - ISOStringToJsDate(a.updatedAt)).map((v)=>
        <Memo 
          key={v.id}
          createdAt={v.createdAt}
          updatedAt={v.updatedAt}
          id={v.id}
          contents={v.contents}
          title={v.title}
          selectMemo={()=>selectMemo(v.id)}
          selected={selectedId ===v.id }
          />
      )}
    </MemosBlock>
  )
}

export default inject(STORES.MEMO_STORE)(observer(Memos))

const MemosBlock = styled.div`
  display:flex; 
  flex-direction:column;
  flex:1;
  
`