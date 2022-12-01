import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "../stack/Stack";
import { setStacks } from "../../store/StackStore";
import { CardProps } from "../../types/Card.interface";
import { StackProps } from "../../types/Stack.interface";
import { resetDroppedCard, resetTargetStack } from "../../store/BoardStore";
import { transferCardsToStack } from "../../store/StackStore";

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

        symbolList.forEach((symbol, index) => {
            stacksList.push({
                stackType: 'ace',
                index: index,
                cardsList: [],
                stackSymbol: symbol.symbol
            });
        });

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
                index: (stacksList.length + 1),
                cardsList: stackCardList
            });
        }

        console.table(stacksList);

        dispatch(setStacks(stacksList));

        console.log('fin init Board');
    }, []);

    useEffect(() => {
        if (droppedCard.stackIndex == null || droppedCard.card == null) return;

        if (!(targetStack.stackIndex == null)) {
            if (canPlaceCard()) {
                dispatch(transferCardsToStack({targetStackIndex: targetStack.stackIndex, sourceStackIndex: droppedCard.stackIndex, card: droppedCard.card}));
            }
        } else if (stacks.some((stack) => canPlaceCard(stack.index))) {
            let targetStackIndex = stacks.findIndex((stack) => canPlaceCard(stack.index));

            console.log('targetStackIndex', targetStackIndex);
            console.log('droppedCard', droppedCard);

            dispatch(transferCardsToStack({targetStackIndex: targetStackIndex, sourceStackIndex: droppedCard.stackIndex, card: droppedCard.card}));
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
        
        if (stacks[targetStackIndex].stackType === 'ace' && stacks[targetStackIndex].stackSymbol === droppedCard.card.symbol) {
            if (stacks[targetStackIndex].cardsList.length === 0 && droppedCard.card.number === 1) return true;
            else if (stacks[targetStackIndex].cardsList.number === (droppedCard.card.number - 1)) return true;
        }
        
        /* La pile est vide et la carte à poser est le roi */
        if (stacks.length === 0 && droppedCard.card.number === 13) {
            if (stacks[targetStackIndex].stackType === 'ace' && droppedCard.card.number === 1) {
                return true;
            }
        }
        else {
            let targetCard = stacks[targetStackIndex].cardsList[stacks[targetStackIndex].cardsList.length - 1];
        
            /* Il est possible de ne pas trouver de carte dans le cas ou une pile serait vide  */
            if (targetCard?.isVisible) {
                if (targetCard.color !== droppedCard.card.color && targetCard.number === droppedCard.card.number + 1) return true;
            }
        }
        
        return false;
    }

    const renderAceStacks = () => {
        return stacks.filter((stack) => stack.stackType === 'ace').map((stack) => {
            return (
                <Stack key={stack.index} index={stack.index} />
            );
        });
    }

    const renderPileStacks = () => {
        return stacks.filter((stack) => stack.stackType === 'pile').map((stack) => {
            return (
                <Stack key={stack.index} index={stack.index} />
            );
        });
    }

    return (
        <div className='board'>
            <div style={{width: '50%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>{
                renderPileStacks()
            }</div>
            <div style={{width: '50%', display: 'grid', gridTemplateColumns: 1, gridTemplateRows: 'repeat(4, 1fr)'}}>{
                renderAceStacks()
            }</div>
        </div>
    );
};

export default Board;