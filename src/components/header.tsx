import React from 'react'
import styled from 'styled-components'

const indicatorColor = Math.trunc(Math.random() * 162627622).toString(16)

const HeaderStyled= styled.div`
    display: flex;
    position: fixed;
    gap: .25rem;
    height: 100px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding:  .25rem;
    z-index: 1200;
    background-color:#AAC4FF ;
    box-shadow:2px 2px 6px rgba(0,0,0,0.6);
    .logo{
        transform: skew(-20deg);
        background-color: orange;
        border-top-left-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 60%;
        padding: 1rem;
        margin-left:2rem ;
        
    }
    .logo:hover{
        cursor: pointer;
        background-color: #eeee;
    }
    ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        gap: 1.25rem;
        align-items: center;
        justify-content:center;
        margin-right: 2rem;
    }
    ul li{
        display: inline;
        padding: 0.25rem;
        margin:  .125rem;
        cursor: pointer;
    }
    li:hover{

        border-radius: 5px;
        text-decoration:  red 2px;
        font-style: oblique;
        font-weight: bolder;

    }
    ul .nav-location{
        color: red;
  
    }
    ul .nav-location .indicator{
        text-decoration: underline;
    }
.location{
    width: 40px;
   box-sizing: border-box;
    height: 30px;
     margin: .125rem;
    border: solid 10px white;
    border-radius: 50%;
.indicator{
   width: 100%;
   height: 100%;
   color: red;
    background-color: red;
    border-radius: 50%;
}
   
.indicator.add{
    background-color:green;   
     color:green;
}
}


`


function Header() {
  return (
      <HeaderStyled>
          <div className="logo">Country Information</div>
          <div className="nav">
              <ul>
                  <li id='nav-home'>Home</li>
                  <li id='nav-location'><span className="location"><span className="indicator">...</span></span>My location</li>
                  <li id='nav-about'>About</li>
           </ul>
          </div>
    </HeaderStyled>
  )
}

export default Header