import { CardProps } from "./Card.interface";

export interface StackProps {
    /* normal? | ace */
    stackType? : string,
    cardsList : CardProps[],
    index? : number,
    style? : any
};