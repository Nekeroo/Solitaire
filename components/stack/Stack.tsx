import { useEffect, useState } from "react";
import { StackProps } from "../../types/Stack.interface";
import { CardProps } from "../../types/Card.interface";
import Card from "../card/Card";

const Stack  = (props : any) => {
    const [cardsList, setcardsList] = useState<CardProps[]>(props.cardsList);
    const [carteDeplace, setCarteDeplace] = useState<CardProps | null>(null);
    const [carteReceptacle, setCarteReceptacle] = useState<CardProps | null>(null);

    /* Récupérer la carte qui est en train d'être déplacée */
    const dragEnd = (event : any, card : CardProps) => {
        console.log(`Stack ${props.index}: dragEnd`);
        // console.log(card);
        setCarteDeplace(card);
    }

    /* Récupérer la carte sur laquelle on vient de déposer la carte */
    const onDrop = (event : any, card : CardProps) => {
        event.preventDefault();
        console.log(`Stack ${props.index}: onDrop`);
        // console.log(card);
        setCarteReceptacle(card);
    }

    /* Permet de savoir si on peut déposer la carte sur la carte sur laquelle on vient de déposer la carte */
    const canPlaceCard = (carteDeplace : CardProps, carteReceptacle : CardProps) : boolean => {
        if (
        carteReceptacle.color != carteDeplace.color &&
        carteReceptacle.number == carteDeplace.number + 1
        ) return true;
        
        return false;
    }

    useEffect(() => {
        if (!carteDeplace || !carteReceptacle) return;

        
        if (!carteReceptacle.isVisible) {
            console.log('Impossible de déplacer la carte, la destination n\'est pas visible');
        }
        else {
            console.log(carteDeplace, carteReceptacle);
            console.log(`Il est ${canPlaceCard(carteDeplace, carteReceptacle) ? 'possible' : 'impossible'} de déplacer le ${carteDeplace.number} de ${carteDeplace.symbol} sur le ${carteReceptacle.number} de ${carteReceptacle.symbol}`);
        }

        setCarteDeplace(null);
        setCarteReceptacle(null);
    }, [carteDeplace, carteReceptacle]);

    return (
        <div
            style={{
                marginLeft: '20px'
            }}
        >
            <p>{props.stackType}</p>
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
                    >
                        <Card
                            key={index}
                            {...card}
                            style={{
                                position: 'absolute',
                                top: `${index * 55}px`,
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
};

export default Stack;