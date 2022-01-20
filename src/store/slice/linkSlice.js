import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../configApi';

export const createShortLink = createAsyncThunk(
    'links/createShortLink',
    async (url) => {
        const response = await fetch(API_BASE_URL + url, {method: 'POST'})
        return await response.json()
    }
)

const
    initialState = {
        items: [],
        loading: 'idle',
    }

const linkSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: {
        [createShortLink.rejected]: (state) => {
            state.loading = 'rejected'
        },
        [createShortLink.pending]: (state) => {
            state.loading = 'loading'
        },
        [createShortLink.fulfilled]: (state, action) => {
            const {ok, result} = action.payload

            if (ok) {
                state.items.push(result)
                state.loading = 'idle'
            } else {
                state.loading = 'error'
            }
        },
    }
})

export default linkSlice.reducer