import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    is_snackbar_visible:false,
    snackbar_content:"",
    snackbar_type:""
  }
  const snackbar_state = createSlice({
    name: 'snackbar_state',
    initialState,
    reducers:{
        show_snackbar: (state, action) => {
            state.snackbar_content = action.payload.snackbar_content
            state.snackbar_type = action.payload.snackbar_type
            if(!state.is_snackbar_visible) state.is_snackbar_visible = true
        },
        hide_snackbar: (state)=>{            
            if(state.is_snackbar_visible) state.is_snackbar_visible = false            
        },
        remove_snackbar_content_and_type: (state)=>{
            if(state.snackbar_content) state.snackbar_content = ""
            if(state.snackbar_type) state.snackbar_type = ""
        }
    }
  })
export const {show_snackbar, hide_snackbar, remove_snackbar_content_and_type} = snackbar_state.actions
export default snackbar_state.reducer;