import { CardProps } from "./Card.interface";

export interface StackType {
    /* pile? | ace */
    stackType? : string,
    cardsList : CardProps[],
    index? : number,
    style? : any
};