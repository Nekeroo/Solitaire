import { CardProps } from "./Card.interface";

<<<<<<< HEAD
export interface StackType {
    /* pile? | ace */
=======
export interface StackProps {
    /* pioche | pile | ace */
>>>>>>> 3e085ef67a568a00880d710a87a6dc4ae04fa882
    stackType? : string,
    cardsList : CardProps[],
    index? : number,
    style? : any
};