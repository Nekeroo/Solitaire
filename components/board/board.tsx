import { createRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStacks as setStacksR } from '../../store/StackStore';
import { StackType } from '../../types/Stack.interface';
import { CardProps } from '../../types/Card.interface';
import Stack from '../stack/Stack';

const Board = () => {
    const [initOK, setInitOK] = useState<boolean>(false);
    const [stacks, setStacks] = useState<StackType[]>([]);
    const [stacksRefs, setStacksRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
    const [dropSourceInfo, setDropSourceInfo] = useState<{stackIndex: number, card: CardProps} | null>(null);
    const [dropTargetInfo, setDropTargetInfo] = useState<{stackIndex: number, card: CardProps} | null>(null);

    const dispatch = useDispatch();
    const stacksRedux = useSelector((state: any) => state.stacks);

    useEffect(() => {
        console.log(stacksRedux);
    }, [stacksRedux]);

    /* Init */
    useEffect(() => {
        if (initOK) return;

        let numCardList = Array.from({length: 13}, (_, i) => i + 1);
        let symbolList = [{symbol: 'heart', color: 'red'}, {symbol: 'tile', color: 'red'}, {symbol: 'clover', color: 'black'}, {symbol: 'pike', color: 'black'}];

        let cardsList : CardProps[] = []
        
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

        let stacksList : StackType[] = [];

        for (let i = 0; i < 7; i++) {
            let stackCardList : CardProps[] = [];
            
            for (let j = 0; j < i + 1; j++) {
                let randomCardIndex = Math.round(Math.random() * (cardsList.length - 1));
                let randomCard = cardsList[randomCardIndex];

                if (j != i) {   
                    randomCard.isVisible = false;
                }

                stackCardList.push(randomCard);

                cardsList.splice(randomCardIndex, 1);
            }

            stacksList.push({
                stackType: 'pile',
                index: i,
                cardsList: stackCardList
            });

            let temp = stacksRefs;

            temp.splice(1, 0, createRef());

            setStacksRefs(temp);
        }

        document.addEventListener('onDragSource', (event : any) => {onDragHandler(event)});
        document.addEventListener('onDropTarget', (event : any) => {onDropHandler(event)});
        document.addEventListener('onClickCard', (event: any) => {onClickCardHandler(event)});

        setStacks(stacksList);
        // dispatch(setStacksR([...stacksList]));
        setInitOK(true);
    });

    const onDragHandler = (event : any) => {
        // console.log('onDragHandler');
        // console.log(event.detail);
        setDropSourceInfo(event.detail);
    }

    const onDropHandler = (event : any) => {
        // console.log('onDropHandler');
        // console.log(event.detail);
        setDropTargetInfo(event.detail);
    }

    const onClickCardHandler = (event: any) => {
        let possibleStacksIndex = [];

        possibleStacksIndex = stacksRefs.filter((stackRef) => (stackRef.current as any).canPlaceCard(event.detail.card));

        if (possibleStacksIndex.length > 0) {
            (stacksRefs[(possibleStacksIndex[0].current as any).getIndex()].current as any).placeCard(event.detail.card);
            (stacksRefs[event.detail.stackIndex].current as any).removeCard(event.detail.card);
        }
    }

    useEffect(() => {
        if (!dropSourceInfo || !dropTargetInfo) return;

        let stackSource = stacksRefs[dropSourceInfo.stackIndex].current as any;
        let stackTarget = stacksRefs[dropTargetInfo.stackIndex].current as any;

        if (!stackSource || !stackTarget) return;

        if (stackTarget.canPlaceCard(dropSourceInfo.card)) {
            stackTarget.placeCard(dropSourceInfo.card);
            stackSource.removeCard(dropSourceInfo.card);
        }

        setDropSourceInfo(null);
        setDropTargetInfo(null);
    }, [dropSourceInfo, dropTargetInfo]);

    return (
        <div className='board'>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)'}}>{
                stacks.map((stack, index) => {
                    return (
                        <Stack {...stack} ref={stacksRefs[index]}></Stack>
                    );
                })
            }</div>
        </div>
    );
};

export default Board;