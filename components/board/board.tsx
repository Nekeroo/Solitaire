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
    const targetStackInfo = useSelector((state : any) => state.board.targetStack);
    const droppedCardInfo = useSelector((state : any) => state.board.droppedCard);

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
                // let randomCardIndex = Math.round(Math.random() * (cardsList.length - 1));
                let randomCardIndex = 0;
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
                index: stacksList.length,
                cardsList: stackCardList
            });
        }

        console.table(stacksList);

        dispatch(setStacks(stacksList));

        console.log('fin init Board');
    }, []);

    useEffect(() => {
        if (droppedCardInfo.stackIndex == null || droppedCardInfo.card == null) return;

        if (!(targetStackInfo.stackIndex == null)) {
            if (canPlaceCard()) {
                dispatch(transferCardsToStack({targetStackIndex: targetStackInfo.stackIndex, sourceStackIndex: droppedCardInfo.stackIndex, card: droppedCardInfo.card}));
            }
        } else if (stacks.some((stack) => canPlaceCard(stack.index))) {
            let targetStackIndex = stacks.find((stack) => canPlaceCard(stack.index)).index;

            dispatch(transferCardsToStack({targetStackIndex: targetStackIndex, sourceStackIndex: droppedCardInfo.stackIndex, card: droppedCardInfo.card}));
        }

        dispatch(resetDroppedCard());
        dispatch(resetTargetStack());
    }, [targetStackInfo, droppedCardInfo]);

    const canPlaceCard = (forcedStackIndex? : number) => {
        if (
            (targetStackInfo.stackIndex == null && forcedStackIndex == null) ||
            (droppedCardInfo.stackIndex == null || droppedCardInfo.card == null)
        ) return false;

        let targetStackIndex = targetStackInfo.stackIndex ?? forcedStackIndex;
        let targetStack = stacks[targetStackIndex];
        
        console.log(targetStack.cardsList.length, droppedCardInfo.card.number);

        if (targetStack.stackType === 'ace' && targetStack.stackSymbol === droppedCardInfo.card.symbol) {
            let targetStackCardListLength = targetStack.cardsList.length;            
            
            if (targetStackCardListLength === 0 && droppedCardInfo.card.number === 1) return true;
            else if (
                targetStackCardListLength > 0 &&
                targetStack.cardsList[targetStackCardListLength - 1].number === (droppedCardInfo.card.number - 1)
            ) return true;
        }
        
        /* La pile est vide et la carte à poser est le roi */
        if (targetStack.cardsList.length === 0 && droppedCardInfo.card.number === 13) {            
            return true;
        }
        else {
            let targetCard = targetStack.cardsList[targetStack.cardsList.length - 1];
        
            /* Il est possible de ne pas trouver de carte dans le cas ou une pile serait vide  */
            if (targetCard?.isVisible) {
                if (targetCard.color !== droppedCardInfo.card.color && targetCard.number === droppedCardInfo.card.number + 1) return true;
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
            <div style={{width: '50%', display: 'grid', gridTemplateColumns: 1, gridTemplateRows: 'repeat(4, 200px)'}}>{
                renderAceStacks()
            }</div>
        </div>
    );
};

export default Board;