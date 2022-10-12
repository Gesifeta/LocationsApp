import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCountry = createAsyncThunk('country/getCountry', async () => {
    return fetch(`https://restcountries.com/v3.1/all`).then(response=>response.json())
})


export const getMyPosition = createAsyncThunk('country/getMyPostion', async () => {
    return new Promise((resolve, reject) => {
        
        navigator.geolocation.getCurrentPosition((pos)=>resolve(pos),(error)=>reject(alert('Please allow location service on your web browser')))
      }) 
})
const countrySlice = createSlice({
    name: 'countryInfo',
    initialState: {
        countries: [],
        myPosition:'',
        displayWidth:[60,40],
        country: [],
        neighbors: [],
        positionFound:false,
        isLoading: true,
      
    },
    reducers: {
        addNeigbors: (state, action) => {
            state.neighbors=action.payload
        },
    setCountry: (state, action) => {
        state.country = action.payload
        state.isLoading=false
       
        },
        setPosition: (state, action) => {
    
            state.myPosition = action.payload
      state.positionFound = true
           
            },
        setWidth: (state, action) => {
            state.displayWidth = action.payload
            },
    },
    extraReducers: {
        [getCountry.pending.toString()]: (state) => {
            state.isLoading = true
        },
        [getCountry.fulfilled.toString()]: (state,actions) => {
            state.isLoading = false
            state.countries = actions.payload     
        }
        ,
        [getMyPosition.pending.toString()]: (state) => {
            state.positionFound = false
        }
        ,
        [getMyPosition.fulfilled.toString()]: (state,actions) => {
            state.positionFound = true
            state.myPosition = actions.payload
        },
        [getMyPosition.rejected.toString()]: (state) => {
            state.positionFound = false 
        }      
    }    
})

export const {setCountry, addNeigbors,setWidth ,setPosition} = countrySlice.actions

export default  countrySlice.reducer
