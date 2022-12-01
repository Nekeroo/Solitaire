import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { setDroppedCard, setTargetStack } from "../../store/BoardStore";

const Stack  = (props : any) => {
    const dispatch = useDispatch();

    const stack = useSelector((state: any) => state.stacks.find((stack : any) => stack.index === props.index), shallowEqual);

    return (
        <div
            style={{
                height: '100%'
            }}
        >
            <p>{stack.index}</p>
            <div
                style={{
                    position: 'relative'
                }}
            >{
            stack.cardsList?.map((card : any, index : number) => {
                return (
                    <div
                        // onDragEnd={(e: object) => dragEnd(e, card)}
                        // onDrop={(event) => onDrop(event, card)}
                        // onClick={(event) => onClickCard(event, card)}
                        onDrop={(event) => dispatch(setTargetStack({stackIndex: stack.index}))}
                        onDragEnd={(event) => dispatch(setDroppedCard({stackIndex: stack.index, card: card}))}
                        onClick={(event) => dispatch(setDroppedCard({stackIndex: stack.index, card: card}))}
                    >
                        <Card
                            key={index}
                            {...card}
                            style={{
                                position: 'absolute',
                                top: `${index * 45}px`,
                                left: '0px',
                                height: '182px',
                                boxShadow: '0px 2px 1px 0px #00000029'
                            }}
                        />
                    </div>
                )
              })
            }</div>
        </div>
    );
};

export default Stack;