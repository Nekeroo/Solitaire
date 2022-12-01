import { configureStore } from '@reduxjs/toolkit';
import StacksStore from './StackStore';
import BoardStore from './BoardStore';

const store = configureStore({
    reducer : {
        stacks: StacksStore.reducer,
        board: BoardStore.reducer
    }
});

export default store;