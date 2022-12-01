import { configureStore } from '@reduxjs/toolkit';
import StacksStore from './StackStore';

const store = configureStore({
    reducer : {
        stacks: StacksStore.reducer
    }
});

export default store;