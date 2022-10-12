import React, { useState, useEffect } from 'react'
import { Country } from './types/country'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { setCountry, addNeigbors, setWidth } from './features/countrySlice.ts'
import Map from './components/countryMap.tsx'
import MyLocation from './components/myLocation.tsx'
import loadMap from './loadMap.ts';

const googleMapLoaded=loadMap();

const Container = styled.div`
overflow-x: hidden;
padding: .5rem ;
padding-top: 110px;
margin: auto;

width: 90%;
display: grid;
grid-template-columns: 55% 40%;
justify-content: space-between;
align-items: flex-start;
width:90%;
gap: 1.25rem;
.loader{
 color:green;
 width: 100%;
 height: 60vh;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921');
  background-size:100%;
  background-repeat: no-repeat;
}
.overlay{
  position: absolute;
  display: none;
  margin: auto;
  overflow-x:hidden;
  min-width: 100vw;
  min-height: 1800px;
  z-index: 199;
}
.position{
position: absolute;
transform: translateX(400px);
transition: transform .4s ease-in;
display: none;
top: 5%;
left: 15%;
width: 60%;
border: solid orange 1px;
z-index: 200;
box-shadow: 2px 2px 2px 5px rgba(0 ,0,0,.6);
}
.position.show, .overlay.show{
  display: block;
  transform: translateX(0);
  transition: transform .4s ease-in;
  backdrop-filter: blur(3px);
}
.position.show{
  display: block;

}

.position.hide, .overlay.hide{
  display: none;
}

#map{
position: relative;
  transition: transform .4s ease-in;
  height: 60vh;
  margin: 1rem;

}
#myLocation{
position: relative;
  transition: transform .4s ease-in;
  height: 70vh;
  margin: 1rem;

}
h1{
  color: #AAC4FF;
  font-weight: bolder;
  margin-left: .25em;
}
#map.show{

  transition: transform .4s ease-in;
  right: 1.125rem;
}
#map .close{
  position: absolute;
  top: .125rem;
  right: .125rem;
  width: 20px;
  height: 20px;
  background-color: #ee2f;
  z-index: 3;
}

`
const StyledSearch = styled.div`
display: grid;
margin: 1.5rem;
grid-template-columns: 20% 80%;
.search{
  box-shadow: 2px 2px 5px rgba(0,0,0, .6)
}

label{
  min-height: 3rem;
  padding: 1rem;
   color: black;
}
input{
    padding: 0.25rem;
    min-height: 3rem;
    font-weight:bolder;
    color: orange;
    border-style:unset;
    font-size: 20px;
    border-bottom:1px orange solid;
    font-style:italic;
}
   
`
const TableStyled = styled.table`
background-color: azure;
width: 100%;
padding: 0.5rem;

 th, td{
  column-span:3;
  border: 1px ;
  cursor: pointer;
 
}
tr:hover{
  background-color: #66bebe;
}
tr:nth-child(odd){
  background-color: #AAC4FF ; 
  border-bottom: 1px solid;
}
  input{
    width: 60%;
  }
`
const StyledCard = styled.div`
display: flex;
flex-direction: column;
padding: 1.25rem;
box-sizing: border-box;
border: 1px solid orange;
transition: all .2s ease-in 3s;
display: grid;
flex-direction: column;
gap: 1.5rem;
border-radius: 5px;
background-color:#eeee;
text-align: center;
justify-items: center;
.flag.none{
  color:orange;
  padding: 1em;
}
p{
    font-size: 26px;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline 3px red;
    letter-spacing:5px
  }
  .country-card{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    font-size: smaller;


  }
.card{
  width: 100%;
border-radius: 5px;
padding-bottom: 1.25rem;
color: #06283D;
text-align: left;
  line-height: 1.5;
  box-shadow: 2px 2px 6px rgba(0,0,0,.6);
  border-bottom: solid 2px green;
h4{
  padding-left: 1em;
  font-style:italic;
  color: gray;
}
}
.card:nth-of-type(even){
  transform: translateX();
}
.card.show{
  transform: translateX(0);
}
img{
  width: 100%;
  height: 25vh;
}`
export default function Home() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  let { countries, country,positionFound,myPosition,isLoading, neighbors } = useSelector((data) => data.countryInfo)
 
  let center={
     lat: 0,
    lng:0
  }
  const [filter, setFilter] = useState([])
  const [showNeighbor, setShowNeighbor] = useState(false)
  const handleChange = (e) => {
    const search = e.target.value
    const filteredData = countries.filter((country) => country.name.common.toLowerCase().indexOf(search.toLowerCase()) > -1)
    setValue(search)
    setFilter(filteredData)
  }
  
  useEffect(() => {
    const position = document.querySelector('.position')
    const close = document.querySelector('.close')
    const overlay = document.querySelector('.overlay')
    const indicator=document.querySelector('.indicator')
    const navLocation = document.getElementById('nav-location')

    const interval=  setInterval(changeColor,1000)
    function changeColor() {
      indicator?.classList.toggle('add')
    }
    if (!positionFound) {
      clearInterval(interval)
    }
  
    

    navLocation?.addEventListener('click', showMyPosition)
   window.addEventListener('keydown',closeMyLocation)
    close?.addEventListener('click', closeMyLocation)
    function closeMyLocation(e) {
  
      
      if (e.code === "Escape" ) {
        overlay?.classList.add('hide')
        position?.classList.add('hide')
      }
      else if (e.target.className === 'close') {
        overlay?.classList.add('hide')
        position?.classList.add('hide')
    }
      
    }

    if ((positionFound && googleMapLoaded)) { 
        const map= new google.maps.Map(document.getElementById('myLocation') as HTMLDivElement, {
        center: {
          lat: Number(myPosition.coords.latitude),
          lng:Number(myPosition.coords.longitude)
          },
          mapTypeId:'roadmap',
        zoom:8
     })
      new google.maps.Marker({
        map: map,
        position: {
         lat: Number(myPosition.coords.latitude),
          lng:Number(myPosition.coords.longitude)
        },
  
      })
      
        
      }
    function showMyPosition(e) {
    e.target.style.fontWeight='bold'
      position?.classList.add('show')
      overlay?.classList.add('show')
      position?.classList.remove('hide')
      overlay?.classList.remove('hide')
     
    
    }
  },[positionFound])
  useEffect(() => {

    const countryName = document.querySelectorAll('.countryName')
    const tableRow = document.getElementsByTagName('td')
    const card = document.querySelectorAll('.card')
    countryName.forEach(name => name.addEventListener('click', showNeighbors))
    
    for (let item of tableRow) {
      item.addEventListener('mouseleave', makeRegular)
    }
  
  
 
    function makeRegular(e) {

        const target = e.target
        target.style.fontWeight=''
    }
    function showNeighbors(event) {
      event.preventDefault()
      setShowNeighbor(true)
      dispatch(setWidth([40,60]))
      card.forEach(cards => cards.classList.toggle('show'))
      const target = event.target
      target.parentNode.style.fontWeight = 'bold'
      target.parentNode.style.color = 'blue'
      const getCountryAlpha = countries.filter((country) => country.name.common === target.textContent)[0]
      const [lat, lng] = getCountryAlpha.latlng
      center = {
        lat: lat,
        lng:lng
      }
      dispatch(setCountry(getCountryAlpha))
 
        const map= new google.maps.Map(document.getElementById('map') as HTMLDivElement, {
           center: {
             lat: Number(center.lat),
             lng:Number(center.lng)
           },
           zoom:4
        })
         new google.maps.Marker({
           map: map,
           position: {
            lat: Number(center.lat),
             lng:Number(center.lng)
           }
         })
      const neighbor = getCountryAlpha.borders?.map((alpha) => alpha)
      if (neighbor) {
        const borders = neighbor?.map((alpha => countries.find((country) => country.cca3 === alpha))) 
        dispatch(addNeigbors(borders))
     
      }
      else {
        dispatch(addNeigbors([]))
      }
    
    }
  }, [filter,country])
  return (
    <>
    <Container>
      <div className="countryInfo">
        <div >
          <div className="search">
              <StyledSearch>
            <label htmlFor="search">Search:</label>
             <input type="text" className="search" onChange={handleChange} name='search' placeholder='start typing a country name ....' value={value}/>
        </StyledSearch>   
          </div>
      <TableStyled>
        <thead>
             <tr>
            <th >Flag</th>
            <th>Name</th>
            <th>Region</th>
          <th>Population</th>
        </tr>
        </thead>
        <tbody>
          {filter.map((country:Country, index) => (
            <tr className='country' key={index}>
              <td> {country.flag} </td>
            <td className='countryName'>{country.name.common}</td>    
              <td>{country.region}</td>
       <td >{Number(country.population).toLocaleString("en-US")}</td>
       </tr>
    ))}
          </tbody>
          </TableStyled>
      </div>
    </div>
      <StyledCard>
        {
            !isLoading? (showNeighbor?((<div className="card">  
        <div className="flag"><img src={country?.flags?.png} alt="" /></div>
          <h1>  { country?.name?.common}</h1>
          <h4>Population: {Number(country?.population).toLocaleString("en-US")}</h4>
        <h4>Capital: {country?.capital}</h4>
    <Map/>
        </div>)):(null)):(<div>To get more information, search country and click on country's name</div>)
        }
        <p>Borders</p>
        {neighbors? (
          <div className="country-card">
            {neighbors.map((country, index) => (
              <div key={index} className="card">
                <div className="flag"><img src={country?.flags?.png} alt="" /></div>
                <h1>  {country?.name?.common}</h1>
                <h4>Population: {Number(country?.population).toLocaleString("en-US")}</h4>
                <h4>Capital: {country?.capital}</h4>
              </div>
            ))}
          </div>) : (<div className="country-card"><div >The country has no borders</div></div>)}
 
        </StyledCard>
        <div className="overlay">
           <div className="position">

          {positionFound ? ( <MyLocation/>):( <div className='loader'>Access to your location not granted, Allow access location to see</div> )}
       </div>

        </div>
       
      </Container>
    
    
    </>
    
  )
}
