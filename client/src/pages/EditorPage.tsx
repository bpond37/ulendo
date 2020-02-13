import React from 'react'
import {inject, observer} from 'mobx-react'
import EditorTemplate from '../components/editor/EditorTemplate'
import TopBar from '../components/TopBar'
import Editor from '../components/editor/Editor'
import MemoStore from '../stores/memo/MemoStores'
import AuthStore from '../stores/auth/AuthStore'
import { STORES } from '../constants'
import Memos from '../components/editor/Memos'
import { RouteComponentProps} from 'react-router'

type InjectedProps = {
  [STORES.MEMO_STORE] : MemoStore
  [STORES.AUTH_STORE] : AuthStore
}
function EditorPage (props:InjectedProps & RouteComponentProps){
  return(
    <EditorTemplate
      topBar={<TopBar {...props}/>}
      editor={<Editor {...props}/>}
      preview={<Memos {...props}/>}
      />
  )
}

export default inject(STORES.MEMO_STORE, STORES.AUTH_STORE)(observer(EditorPage))