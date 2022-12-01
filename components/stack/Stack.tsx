import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StackType } from "../../types/Stack.interface";
import { CardProps } from "../../types/Card.interface";
import Card from "../card/Card";

const Stack  = forwardRef((props : any, ref : any) => {
    const [cardsList, setCardsList] = useState<CardProps[]>(props.cardsList);

    /* Récupérer la carte qui est en train d'être déplacée */
    const dragEnd = (event : any, card : CardProps) => {
        // console.log(`Stack ${props.index}: dragEnd`);
        // console.log(card);
        // setCarteDeplace(card);
        document.dispatchEvent(new CustomEvent('onDragSource', {detail: {stackIndex: props.index, card: card}}));
    }

    /* Récupérer la carte sur laquelle on vient de déposer la carte */
    const onDrop = (event : any, card : CardProps) => {
        event.preventDefault();
        // console.log(`Stack ${props.index}: onDrop`);
        // console.log(card);
        // setCarteReceptacle(card);
        document.dispatchEvent(new CustomEvent('onDropTarget', {detail: {stackIndex: props.index, card: card}}));
    }

    const onClickCard = (event : any, card : CardProps) => {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent('onClickCard', {detail: {stackIndex: props.index, card: card}}));
    }

    useImperativeHandle(ref, () => ({
        /* Permet de savoir si on peut déposer la carte sur la carte sur laquelle on vient de déposer la carte */
        canPlaceCard(carteDeplace : CardProps) : boolean {
            if (!carteDeplace.isVisible) return false;

            if (cardsList.length === 0) {
                if (carteDeplace.number === 13) return true;
            }
            else {
                let carteReceptacle = cardsList[cardsList.length - 1];

                if (
                    carteReceptacle.color != carteDeplace.color &&
                    carteReceptacle.number == carteDeplace.number + 1
                ) return true;
            }

            return false;
        },

        removeCard(cardToRemove : CardProps) {
            let newCardList = [...cardsList];
            newCardList.splice(cardsList.indexOf(cardToRemove), 1);

            /* Retourner la dernière carte de la pile */
            if (newCardList.length > 0)
                newCardList[newCardList.length - 1].isVisible = true;

            setCardsList(newCardList);
        },

        placeCard(cardToPlace : CardProps) {
            setCardsList([...cardsList, cardToPlace]);
        },

        getIndex() : number {return props.index}
    }));

    return (
        <div
            style={{
                height: '100%'
            }}
            ref={ref}
        >
            <p>{props.stackType} {props.index}</p>
            <div
                style={{
                    position: 'relative'
                }}
            >{
            cardsList.map((card, index) => {
                return (
                    <div
                        onDragEnd={(e: object) => dragEnd(e, card)}
                        onDrop={(event) => onDrop(event, card)}
                        onClick={(event) => onClickCard(event, card)}
                    >
                        <Card
                            key={index}
                            {...card}
                            style={{
                                position: 'absolute',
                                top: `${index * 45}px`,
                                left: '0px',
                                height: '182px',
                                boxShadow: '0px -2px 1px 0px #00000029'
                            }}
                        />
                    </div>
                )
              })
            }</div>
        </div>
    )
});

export default Stack;