import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "../stack/Stack";
import { setStacks } from "../../store/StackStore";
import { CardProps } from "../../types/Card.interface";
import { StackProps } from "../../types/Stack.interface";
import { resetDroppedCard, resetTargetStack } from "../../store/BoardStore";
import { addCardToStack, removeCardFromStack } from "../../store/StackStore";

const Board = () => {
    const dispatch = useDispatch();

    const stacks = useSelector((state: any) => state.stacks);
    const targetStack = useSelector((state : any) => state.board.targetStack);
    const droppedCard = useSelector((state : any) => state.board.droppedCard);

    /* Init */
    useEffect(() => {
        console.log('init Board');

        let numCardList = Array.from({length: 13}, (_, i) => i + 1);
        let symbolList = [
            {symbol: 'heart', color: 'red'},
            {symbol: 'tile', color: 'red'},
            {symbol: 'clover', color: 'black'},
            {symbol: 'pike', color: 'black'}
        ];

        let cardsList : CardProps[] = [];

        symbolList.forEach(({symbol, color}) => {
            numCardList.forEach((number) => {
                cardsList.push({
                    number: number,
                    symbol: symbol,
                    color: color,
                    isVisible: true
                });
            })
        });

        let stacksList = [];

        for (let i = 0; i < 7; i++) {
            let stackCardList : CardProps[] = [];

            for (let j = 0; j < i + 1; j++) {
                let randomCardIndex = Math.round(Math.random() * (cardsList.length - 1));
                let randomCard = cardsList[randomCardIndex];

                if (j != i) {   
                    randomCard.isVisible = false;
                }

                stackCardList.push(randomCard);

                /* Retirer la carte de la liste des cartes */
                cardsList.splice(randomCardIndex, 1);
            }

            stacksList.push({
                stackType: 'pile',
                index: i,
                cardsList: stackCardList
            });
        }

        dispatch(setStacks(stacksList));

        console.log('fin init Board');
    }, []);

    useEffect(() => {
        if (droppedCard.stackIndex == null || droppedCard.card == null) return;

        if (!targetStack.stackIndex == null) {
            if (canPlaceCard()) {
                dispatch(addCardToStack({stackIndex: targetStack.stackIndex, card: droppedCard.card}));
                dispatch(removeCardFromStack({stackIndex: droppedCard.stackIndex, card: droppedCard.card}));
            }
        } else if (stacks.some((stack) => canPlaceCard(stack.index))) {
            let targetStackIndex = stacks.findIndex((stack) => canPlaceCard(stack.index));

            dispatch(addCardToStack({stackIndex: targetStackIndex, card: droppedCard.card}));
            dispatch(removeCardFromStack({stackIndex: droppedCard.stackIndex, card: droppedCard.card}));
        }

        dispatch(resetDroppedCard());
        dispatch(resetTargetStack());
    }, [targetStack, droppedCard]);

    const canPlaceCard = (forcedStackIndex? : number) => {
        if (
            (targetStack.stackIndex == null && forcedStackIndex == null) ||
            (droppedCard.stackIndex == null || droppedCard.card == null)
        ) return false;

        let targetStackIndex = targetStack.stackIndex ?? forcedStackIndex;
        
        /* La pile est vide et la carte à poser est le roi */
        if (stacks.length === 0 && droppedCard.card.number === 13) return true;
        else {
            let targetCard = stacks[targetStackIndex].cardsList[stacks[targetStackIndex].cardsList.length - 1];
        
            if (targetCard.isVisible) {
                if (targetCard.color !== droppedCard.card.color && targetCard.number === droppedCard.card.number + 1) return true;
            }
        }
        
        return false;
    }

    return (
        <div className='board'>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>{
                stacks.map((stack : any) => {
                    return (
                        <Stack index={stack.index} />
                    );
                })
            }</div>
        </div>
    );
};

export default Board;