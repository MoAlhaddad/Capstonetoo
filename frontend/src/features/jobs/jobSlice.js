import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import jobService from './jobService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new Job
export const createJob = createAsyncThunk('jobs/create', async (jobData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.createJob(jobData, token)

    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
} )

// get user Jobs
export const getJobs = createAsyncThunk('jobs/getAll', async (_,
    thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await jobService.getJobs(token)
    
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

     //Delete user job

    export const deleteJob = createAsyncThunk('jobs/delete', async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await jobService.deleteJob(id, token)
    
        } catch (error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
        }
    } )
    

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
              state.isLoading = true
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.jobs.push(action.payload)
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
    })
    .addCase(getJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobs.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.jobs = action.payload
      })
      .addCase(getJobs.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
})
.addCase(deleteJob.pending, (state) => {
    state.isLoading = true
  })
  .addCase(deleteJob.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.jobs = state.jobs.filter((job) => job._id !== action.payload.id)
  })
  .addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
})

   }
})

export const {reset} = jobSlice.actions
export default jobSlice.reducer
