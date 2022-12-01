import { createSlice } from '@reduxjs/toolkit';

const StacksStore = createSlice({
    name: 'stacks',
    initialState: [] as any,
    reducers: {
        /*
            action.payload = {
                targetStackIndex: number,
                sourceStackIndex: number,
                card: CardProps
            }
        */
        transferCardsToStack: (state, {payload: {card, sourceStackIndex, targetStackIndex}}) => {
            if (
                !card || sourceStackIndex == undefined || targetStackIndex == undefined
            ) return;

            let indexCard = state[sourceStackIndex].cardsList.findIndex((c) => c.number === card.number && c.color === card.color && c.symbol === card.symbol);
            let countCard = state[sourceStackIndex].cardsList.length - indexCard;

            let cardsToMove = state[sourceStackIndex].cardsList.slice(indexCard, indexCard + countCard);

            state[targetStackIndex].cardsList.push(...cardsToMove);
            state[sourceStackIndex].cardsList.splice(indexCard, countCard);

            if (state[sourceStackIndex].cardsList.length > 0) {
                state[sourceStackIndex].cardsList[state[sourceStackIndex].cardsList.length - 1].isVisible = true;
            }
        },

        setStacks: (state, action) => {
            return action.payload;
        }
    }
});

export const {
    transferCardsToStack,
    setStacks
} = StacksStore.actions;

export default StacksStore;