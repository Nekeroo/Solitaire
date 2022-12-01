import { CardProps } from "./Card.interface";

export interface StackProps {
    /* pioche | pile | ace */
    stackType? : string,
    cardsList : CardProps[],
    index? : number,
    style? : any,
    stackSymbol? : string
};