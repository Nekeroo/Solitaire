import { CardProps } from "./Card.interface";

export interface StackProps {
    /* pile? | ace */
    stackType? : string,
    cardsList : CardProps[],
    index? : number,
    style? : any
};