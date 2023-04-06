import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    is_progress_visible:false,
  }
  const progress_state = createSlice({
    name: 'progress_state',
    initialState,
    reducers:{
        show_progress: (state) => {
            if(!state.is_progress_visible) state.is_progress_visible = true
        },
        hide_progress: (state)=>{            
            if(state.is_progress_visible) state.is_progress_visible = false
        }        
    }
  })
export const { show_progress, hide_progress } = progress_state.actions
export default progress_state.reducer;