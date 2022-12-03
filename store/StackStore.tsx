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

            if (state[targetStackIndex].stackType === 'pioche') {
                console.table(state[targetStackIndex].cardsList);
            }

            state[targetStackIndex].cardsList.push(...cardsToMove);
            state[sourceStackIndex].cardsList.splice(indexCard, countCard);

            if (state[sourceStackIndex].cardsList.length > 0) {
                state[sourceStackIndex].cardsList[state[sourceStackIndex].cardsList.length - 1].isVisible = true;
            }
        },
        
        turnCard: (state, action) => {
            let stackIndex = action.payload.stackIndex;
            let cardToTurn = action.payload.card;

            if (stackIndex == undefined || !cardToTurn) return;

            let card = state[stackIndex].cardsList.find((c) => c.number === cardToTurn.number && c.color === cardToTurn.color && c.symbol === cardToTurn.symbol);

            card.isVisible = !card.isVisible;
        },

        setStacks: (state, action) => {
            return action.payload;
        }
    }
});

export const {
    transferCardsToStack,
    turnCard,
    setStacks
} = StacksStore.actions;

export default StacksStore;