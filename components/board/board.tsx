import { useEffect, useState } from 'react';
import { StackProps } from '../../types/Stack.interface';
import { CardProps } from '../../types/Card.interface';
import Stack from '../stack/Stack';

const Board = () => {
    const [initOK, setInitOK] = useState<boolean>(false);
    const [stacks, setStacks] = useState<StackProps[]>([]);

    /* Init */
    useEffect(() => {
        console.log(initOK);
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
                isVisible: Math.random() > 0.9 ? false : true
            });
            })
        });

        let stacksList : StackProps[] = [];

        for (let i = 0; i < 7; i++) {
            let stackCardList : CardProps[] = [];
            console.log('creation du stack ' + i);
            
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
        }

        setStacks(stacksList);
        setInitOK(true);
    });

    return (
        <div className='board'>{
            stacks.map((stack) => {
                return (
                    <Stack {...stack}></Stack>
                );
            })
        }</div>
    );
};

export default Board;