import { createSlice } from '@reduxjs/toolkit';

const StacksStore = createSlice({
    name: 'stacks',
    initialState: [] as any,
    reducers: {
        addCardToStack: (state, action) => {
            if (
                action.payload.stackIndex === null ||
                action.payload.card === null
            ) return;

            state[action.payload.stackIndex].cardsList.push(action.payload.card);
        },

        removeCardFromStack: (state, action) => {
            if (
                action.payload.stackIndex === null ||
                action.payload.card === null
            ) return;

            let cardIndex = state[action.payload.stackIndex].cardsList.indexOf(action.payload.card);

            state[action.payload.stackIndex].cardsList.splice(cardIndex, 1);

            state[action.payload.stackIndex].cardsList[state[action.payload.stackIndex].cardsList.length - 1].isVisible = true;
        },

        setStacks: (state, action) => {
            return action.payload;
        }
    }
});

export const {
    addCardToStack,
    removeCardFromStack,
    setStacks
} = StacksStore.actions;

export default StacksStore;