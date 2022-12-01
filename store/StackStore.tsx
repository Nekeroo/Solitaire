import { createSlice } from '@reduxjs/toolkit';

const StacksStore = createSlice({
    name: 'stacks',
    initialState: [] as any,
    reducers: {
        setStacks: (state, action) => {
            console.log(action.payload);
            console.log(state.length);
            let temp = action.payload;
            state.push(temp);
            console.log(state.length);
        }
    }
});

export const { setStacks } = StacksStore.actions;

export default StacksStore;