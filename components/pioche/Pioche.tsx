import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { setDroppedCard } from "../../store/BoardStore";
import { turnCard } from "../../store/StackStore";
import { useEffect } from "react";

const Pioche = (props) => {
    const dispatch = useDispatch();

    const stack = useSelector((state: any) => state.stacks.find((stack : any) => stack.index === props.index && stack.stackType === 'pioche'));

    useEffect(() => {
        console.log(stack);
    }, [stack])

    const renderVisibleCards = () => {
        let visibleCards = stack.cardsList.filter((card) => card.isVisible);

        console.log(visibleCards);
        visibleCards = (visibleCards.slice(visibleCards.length - 3)).reverse();
        console.log(visibleCards);

        return visibleCards.map((card : any, index: number) => {
            return (
                <div
                    onDragEnd={(event) => dispatch(setDroppedCard({stackIndex: stack.index, card: card}))}
                    onClick={(event) => dispatch(setDroppedCard({stackIndex: stack.index, card: card}))}
                >
                    <Card
                        {...card}
                        style={{
                            position: 'absolute',
                            top: '0px',
                            left: `${120 + ((index) * 50)}px`,
                            height: '150px',
                            boxShadow: '0px 2px 1px 0px #00000029'
                        }}
                    />
                </div>                        
            )
        });
    }

    return (
        <>
            <div>{
                stack.cardsList.filter((card) => !card.isVisible).map((card : any) => {
                    return (
                        <div
                            onDragEnd={(event) => dispatch(setDroppedCard({stackIndex: stack.index, card: card}))}
                            onClick={(event) => {
                                console.log(stack.cardsList[stack.cardsList.length - 1])
                                dispatch(turnCard({stackIndex: stack.index, card: card}));
                            }}
                        >
                            <Card
                                {...card}
                                style={{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '0px',
                                    height: '150px',
                                    boxShadow: '0px 2px 1px 0px #00000029'
                                }}
                            />
                        </div>                        
                    )
                })
            }</div>
            <div>{
                renderVisibleCards()
            }</div>
        </>
    );
};

export default Pioche;