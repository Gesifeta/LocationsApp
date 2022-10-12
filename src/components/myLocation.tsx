import React from 'react'
import styled from 'styled-components'

const StyledButton=styled.div`
position: relative;
  font-size: 28px;
  font-style: oblique;
  font-weight: bolder;
  .close{ 
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40px;
    height: 40px;
    top: -1rem;
    right: 0;
    cursor: pointer;
    border-radius: 5px;
    background-color: #b3dfeb;
    z-index: 3201;
  }
  .close:hover{
    background-color: aquamarine;
    color: red;
  }

`
function MyLocation() {
  return (
<StyledButton>
      <div id="myLocation"></div>
      <div className="close">X</div>
</StyledButton>
   
  )
}

export default MyLocation