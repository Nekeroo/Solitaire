export interface CardProps {
    // color: "red" | "black",
    color: string,
    /*
        heart: coeur
        tile: carreau
        clover: trèfle
        pike: pique
    */
    // symbol: "heart" | "tile" | "clover" | "pike",
    symbol: string,
    number: number,
    isVisible: boolean,
    style?: any
}