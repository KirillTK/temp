import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  name: string
  age: number;
  surname: string;
}

const initialState = { name: '', age: 0, surname: '' } satisfies CounterState as CounterState

const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload;
    },
    clearName(state) {
      state.name = '';
    },
    setAge(state, action: PayloadAction<number>) {
      state.age = action.payload;
    },
  },
})

export const { setName, clearName, setAge, setSurname } = counterSlice.actions
export default counterSlice.reducer