
import './App.css';
import Home from './home.tsx';
import Header from './components/header.tsx';
import { getCountry,getMyPosition } from './features/countrySlice.ts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // Following line of code helps to fetch country data from REST COUNTRIES API
    dispatch(getCountry())
    dispatch(getMyPosition())

  })
  return ( 
    <>
      <Header/>
      <Home/>
      </>);
}

export default App;
