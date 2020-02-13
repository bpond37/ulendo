import React, {
  ChangeEvent,
  useEffect,
  // useState,
  // useRef
} from 'react';
import styled from 'styled-components';
import {
  getDateFormat,
  ISOStringToJsDate,
  jsDateToISOString,
} from '../../utils';
import moment, { now } from 'moment';
import 'moment/locale/ko';
import { STORES } from '../../../constants';
import MemoStore from '../../../stores/memo/MemoStores';
import { inject, observer } from 'mobx-react';
// import {Editor, EditorState} from 'draft-js';

type InjectedProps = {
  [STORES.MEMO_STORE]: MemoStore;
};

function MyEditor(props: InjectedProps) {
  const { setMemo, memo, updateMemo, syncTitle, syncContents } = props[
    STORES.MEMO_STORE
  ];
  const initialMemo = {
    id: 0,
    title: '',
    createdAt: moment(now()).toISOString(),
    updatedAt: moment(now()).toISOString(),
    contents: '',
  };

  useEffect(() => {
    setMemo(initialMemo);
  }, []);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const tempTitle = e.target.value;
    setMemo({
      ...memo,
      updatedAt: jsDateToISOString(now()),
      id: memo.id,
      title: tempTitle,
    });
    syncTitle(tempTitle);
    updateMemo();
  };

  const handleContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const tempContents = e.target.value;
    setMemo({
      ...memo,
      id: memo.id,
      updatedAt: jsDateToISOString(now()),
      contents: tempContents,
    });
    syncContents(tempContents);
    updateMemo();
  };

  // const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // const editor = useRef<Editor>(null);

  // function focusEditor(){
  //   if(editor && editor.current){
  //     editor.current.focus();
  //   }
  // }

  // useEffect(()=>{
  //   focusEditor()
  // },[])

  return (
    <EditorBlock>
      {/* 
      //향후 draftjs 적용시 사용될 코드
      <div onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState=> setEditorState(editorState)}
        />
      </div> */}

      <EditorBlock className="createdDate">
        {getDateFormat(ISOStringToJsDate(memo.updatedAt))}
      </EditorBlock>
      <EditorBlock className="inputTitle">
        <StyledInputTitle
          type="text"
          value={memo.title}
          onChange={handleTitle}
          placeholder="title"
        />
      </EditorBlock>
      <EditorBlock className="inputText">
        <StyledTextarea
          value={memo.contents}
          onChange={handleContents}
          placeholder={'text'}
        />
      </EditorBlock>
    </EditorBlock>
  );
}

export default inject(STORES.MEMO_STORE)(observer(MyEditor));

const EditorBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* @media(max-width:768px){
    flex:1;
    } */
  &.createdDate {
    height: 2rem;
    flex: 0;
    padding-top: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
    color: darkgray;
  }
  &.inputTitle {
    /* flex: 1; */
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3rem;
    font-size: 1rem;
    height: 1rem;
    flex: 0;
  }
  &.inputText {
    padding: 1rem;
    font-size: 1rem;
    height: 1rem;
  }
`;
const StyledInputTitle = styled.input`
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Nanum Myeongjo', serif;
`;

const StyledTextarea = styled.textarea`
  display: block;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Nanum Myeongjo', serif;
  border: 0px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100% - 60px);
  outline: none;
  resize: none;
`;
