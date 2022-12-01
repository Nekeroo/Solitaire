import { createSlice } from '@reduxjs/toolkit';

const BoardStore = createSlice({
    name: 'board',
    initialState: {
        droppedCard: {
            stackIndex: null,
            card: null
        },
        targetStack: {
            stackIndex: null
        }
    },
    reducers: {
        resetDroppedCard: (state) => {
            state.droppedCard = {
                stackIndex: null,
                card: null
            }
        },

        resetTargetStack: (state) => {
            state.targetStack = {
                stackIndex: null
            }
        },

        setDroppedCard: (state, action) => {
            state.droppedCard = {
                stackIndex: action.payload.stackIndex,
                card: action.payload.card
            };
        },

        setTargetStack: (state, action) => {
            state.targetStack = {
                stackIndex: action.payload.stackIndex
            };
        }
    }
});

export const {
    resetDroppedCard,
    resetTargetStack,
    setDroppedCard,
    setTargetStack
} = BoardStore.actions;
export default BoardStore;