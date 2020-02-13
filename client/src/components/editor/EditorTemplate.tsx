import React,{useState} from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  &.panes{
    height : calc(100vh - 3rem);
    display : flex;
  }
  &.pane{
    display:flex;
    flex:1;
    &.preview{
      @media(max-width:768px){
      flex:0;
      /* display:none; */
      }
    &.editor{
      @media(max-width:768px){
      flex:1;
      }
    }
    }
  }
  &.seperator{
    @media(max-width:768px){
    display:none;
    }
    height:100%;
    position:absolute;
    transform : translate(-50%);
    cursor: col-resize;
    border-left: 1px solid;
    border-color: lightgray
  }
`

export default function EditorTemplate ({topBar, editor, preview}:any){

  const [leftPercentage, setLeftPercentage] = useState(0.2)

  const handleMouseMove = (e:any) =>{
    setLeftPercentage(e.clientX/window.innerWidth)
  }
  const leftStyle = {
    flex: leftPercentage
  }
  const rightStyle = {
    flex: 1-leftPercentage
  }
  const separatorStyle ={
    left: `${leftPercentage*100}%`
  }
  const handleMouseUp = (e:any)=>{
    document.body.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleSeparatorMousdeDown = (e:any) =>{
    document.body.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp)
  }

  return(
    <StyledDiv>
      {topBar}
      <StyledDiv className='panes'>
        <StyledDiv className='pane preview' style={leftStyle}>
          {preview}
        </StyledDiv>
        <StyledDiv className='pane editor' style={rightStyle}>
          {editor}
        </StyledDiv>
        <StyledDiv 
          className='seperator'
          style={separatorStyle}
          onMouseDown={handleSeparatorMousdeDown}
        >
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}