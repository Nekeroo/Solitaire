import { useEffect, useState } from 'react';
import Card from '../components/card/Card';
import { CardProps } from '../types/Card.interface';

export default function Home() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [initOK, setInitOK] = useState(false);

  const [carteDeplace, setCarteDeplace] = useState<CardProps | null>(null);
  const [carteReceptacle, setCarteReceptacle] = useState<CardProps | null>(null);

  /* https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react */
  /* Récupérer la carte qui est en train d'être déplacée */
  const dragEnd = (event : any, card : CardProps) => {
    // console.log('Index: dragEnd');
    // console.log(card);
    setCarteDeplace(card);
  }

  /* Récupérer la carte sur laquelle on vient de déposer la carte */
  const onDrop = (event : any, card : CardProps) => {
    event.preventDefault();
    // console.log('Index: onDrop');
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

    console.log(carteDeplace, carteReceptacle);

    console.log(`Il est ${canPlaceCard(carteDeplace, carteReceptacle) ? 'possible' : 'impossible'} de déplacer la carte`);

    setCarteDeplace(null);
    setCarteReceptacle(null);
  }, [carteDeplace, carteReceptacle]);

  /* Init */
  useEffect(() => {
    if (initOK) return;

    let numCardList = Array.from({length: 13}, (_, i) => i + 1);
    let symbolList = [{symbol: 'heart', color: 'red'}, {symbol: 'tile', color: 'red'}, {symbol: 'clover', color: 'black'}, {symbol: 'pike', color: 'black'}];

    let res : CardProps[] = []
    
    symbolList.forEach(({symbol, color}) => {
      numCardList.forEach((number) => {        
        res.push({
          number: number,
          symbol: symbol,
          color: color
        });
      })
    });

    setInitOK(true);
    setCards(res);
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(13, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gridGap: '1rem',
      backgroundColor: '#2b2b3c'
    }}>{
      cards.map((card, index) => {
        return (
          <div
            onDragEnd={(e: object) => dragEnd(e, card)}
            onDrop={(e: any) => onDrop(e, card)}
          >
            <Card key={index} {...card} />
          </div>
        )
      })

      // [...Array(52)].map((_, index) => {
      //   return (<Card key={index} number={index} symbol={'heart'} color={'red'} />)
      // })
    }</div>);
}
