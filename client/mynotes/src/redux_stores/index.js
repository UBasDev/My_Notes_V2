import { configureStore } from "@reduxjs/toolkit"
import snackbar_state from './snackbar_state'
import progress_state from './progress_state'

const redux_store = configureStore({
    reducer:{
        snackbar_state,
        progress_state
    }
})
export default redux_store