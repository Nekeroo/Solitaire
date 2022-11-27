import { useState, useEffect } from "react";
import { CardProps } from "../../types/Card.interface";
import Pike from "../../components/svg/pike";
import Tile from "../../components/svg/tile";
import Clover from "../../components/svg/clover";
import Heart from "../../components/svg/heart";

import styles from '../../assets/css/Card.module.css';

const Card = (CardProps : CardProps) => {
    const getDisplayNumber = () : string => {
        switch (CardProps.number) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return (CardProps.number).toString();
        }
    };

    const dragEnd = (event : any) => {
        // console.log(CardProps);
        console.log('Card: dragEnd');
        console.log(CardProps);
    }

    const drop = (event : any) => {
        // console.log(CardProps);
        console.log('Card: drop');
        console.log(CardProps);
    }

    return (
        <div
            style={CardProps.style}
            className={`${styles.Card}`}
            onDragOver={(event) => event.preventDefault()}
            draggable
        >
            {
                !CardProps.isVisible ?
                    (
                        <div className={styles.CardBackFace}/>
                    )
                :
                    (
                        <div className={styles.CardFrontFace}>
                            <div className={`${styles.CardNumber} top`} style={{color: CardProps.color === 'red' ? '#EF5050' : '#2F3A58'}}>{getDisplayNumber()}</div>
                            <div className={styles.CardSymbol}>{
                                CardProps.symbol === 'pike' ? <Pike /> : 
                                    CardProps.symbol === 'tile' ? <Tile /> :
                                        CardProps.symbol === 'clover' ? <Clover /> :
                                            CardProps.symbol === 'heart' ? <Heart /> : null
                            }</div>
                            <div className={`${styles.CardNumber} ${styles.bottom}`} style={{color: CardProps.color === 'red' ? '#EF5050' : '#2F3A58'}}>{getDisplayNumber()}</div>
                        </div>
                    )
            }
            
        </div>
    )
};

export default Card;