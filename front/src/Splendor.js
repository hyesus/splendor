import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import styled from "styled-components";
import cardData from "./resources/data/card.json";
import nobleData from "./resources/data/noble.json";
import CardImage from "./resources/images/cards.webp";
import NobleImage from "./resources/images/nobles.jpeg";
import TokenImage from "./resources/images/tokens.webp";
import GemImage from "./resources/images/gems.webp";
import NumberSheet from "./resources/images/numbers_sheet.webp"
import BackgroundImage from "./resources/images/bg.webp";
import _ from "lodash";

const gem = {
    white   : "0",
    blue    : "-100%",
    black   : "-200%",
    red     : "-300%",
    green   : "-400%"
};

const point = {
    1 : "0",
    2 : "-100%",
    3 : "-200%",
    4 : "-300%", 
    5 : "-400%",
    6 : "-500%",
    7 : "-600%",
    8 : "-700%",
    9 : "-800%",
    10: "-900%"
};

const Splendor = (props) => {
    //const game_set = { };
    const [myAccount, setMyAccount] = useState({id: "hyesus", win: 0, lose: 0});

    const shuffle = (array) => {
        for (let index = array.length - 1; index > 0; index--) { 
            const randomPosition = Math.floor(Math.random() * (index + 1));
            const temp = array[index]; 
            array[index] = array[randomPosition]; 
            array[randomPosition] = temp; 
        }
    }

    //초기값 세팅
    useEffect(() => {
        shuffle(cardData.level1);
        shuffle(cardData.level2);
        shuffle(cardData.level3);

        setCard_lv1( cardData.level1.splice(0,4) );
        setCard_lv2( cardData.level2.splice(0,4) );
        setCard_lv3( cardData.level3.splice(0,4) );

        setDeck_lv1( cardData.level1 );
        setDeck_lv2( cardData.level2 );
        setDeck_lv3( cardData.level3 );
        
        shuffle(nobleData);

        setTile( nobleData.slice(0,3) ); // player 수 + 1 개 세팅

        setToken({
            "white" : Array(7).fill().map((item, idx) => ({id: "wh" + String(idx + 1).padStart(2, '0'), color: "white", position: "-100% 0" })),
            "blue"  : Array(7).fill().map((item, idx) => ({id: "bl" + String(idx + 1).padStart(2, '0'), color: "blue", position: "-200% 0"})),
            "green" : Array(7).fill().map((item, idx) => ({id: "gr" + String(idx + 1).padStart(2, '0'), color: "green", position: "0 0"})),
            "red"   : Array(7).fill().map((item, idx) => ({id: "rd" + String(idx + 1).padStart(2, '0'), color: "red", position: "-400% 0"})),
            "black" : Array(7).fill().map((item, idx) => ({id: "bk" + String(idx + 1).padStart(2, '0'), color: "black", position: "-300% 0"})),
            "yellow": Array(5).fill().map((item, idx) => ({id: "yl" + String(idx + 1).padStart(2, '0'), color: "yellow", position: "-500% 0"}))
        });
    }, []);

    const [deck_lv1, setDeck_lv1] = useState([]);
    const [deck_lv2, setDeck_lv2] = useState([]);
    const [deck_lv3, setDeck_lv3] = useState([]);

    const [card_lv1, setCard_lv1] = useState([]);
    const [card_lv2, setCard_lv2] = useState([]);
    const [card_lv3, setCard_lv3] = useState([]);


    const [tile, setTile] = useState([]);

    const [token, setToken] = useState({});

    const [player, setPlayer] = useState([
        {
            id: "hyesus",
            card: [], // 구매한 카드
            reservedCard: [], // 예약한 카드
            tile: [], // 획득한 귀족 카드
            token: [], // 가져온 gem 토큰
            bonus: { // 구매한 카드로부터 얻어진 보너스 gem
                white: 0,
                blue: 0,
                green: 0,
                red: 0,
                black: 0
            }, 
            // 매 턴이 끝날 때 마다 현재 재산과 점수를 계산
            points: 0, // 구매한 카드 점수 + 획득한 귀족 카드 점수
            property: { //token + bonus -> 보너스만큼 가격을 할인한 후 토큰 수 차감
                white: 0,
                blue: 0,
                green: 0,
                red: 0,
                black: 0,
                yellow: 0
            }
        },
        {
            id: "bona",
            card: [], // 구매한 카드
            reservedCard: [], // 예약한 카드
            tile: [], // 획득한 귀족 카드
            token: [], // 가져온 gem 토큰
            bonus: [], // 구매한 카드로부터 얻어진 보너스 gem
            // 매 턴이 끝날 때 마다 현재 재산과 점수를 계산
            points: 0, // 구매한 카드 점수 + 획득한 귀족 카드 점수
            property: { //token + bonus -> 보너스만큼 가격을 할인한 후 토큰 수 차감
                white: 0,
                blue: 0,
                green: 0,
                red: 0,
                black: 0,
                yellow: 0
            }
        }
    ]);

    const [ toggleCard, setToggleCard ] = useState([...card_lv1, ...card_lv2, ...card_lv3]?.reduce( (pre,cur) => ( {...pre, [cur.id] : false } ) , {}));

    const onTurn = () => {
    /*
     - On turn, player can do one of the things below.
        i. get/takeTokens - 3 gem of different colors OR 
        2 gem of the same color
       ii. reserveCard, getGoldToken(joker), revealCard
      iii. purchase/acquireCard, spendTokens, discountCostsWithAcquiredBonuses, revealCard 
    */

     /*  가능한 액션 추천
      
      1. 구매 가능한 카드 선정
      2. 예약가능 여부 체크
      3. 코인  */

    }

    const setMyCount = ({id}) => {

        let myCount = player?.filter( p => p?.id === id)[0];
        const bonusKeys = [ ...new Set(myCount?.card?.map( m => m?.bonus)) ];
        const tokenKeys = [ ...new Set(myCount?.token?.map( m => m?.color)) ];

        const totalKeys = [...new Set([...bonusKeys, ...tokenKeys])];

        // 1. 보너스 계산 (내가 가진 건물)
        myCount.bonus = totalKeys.reduce( (pre, cur) => {
            pre[cur] = myCount?.card?.filter( f => f?.bonus === cur )?.length || 0;
            return pre;
        }, {});
        
        // 2. 토큰 계산 (내가 가진 건물)
        myCount.tokenPoint = totalKeys.reduce( (pre, cur) => {
            pre[cur] = myCount?.token?.filter( f => f?.color === cur )?.length || 0;
            return pre;
        }, {});

        // 2. 합산 ( 건물 + 토큰 )
        // token: ["wh01",s "wh02", "bl03"],
        myCount.property = totalKeys?.reduce( (pre, cur) => {
            pre[cur] = (myCount?.bonus[cur] + myCount.tokenPoint[cur]) || 0;
            return pre;
        }, {});
        console.log(_.merge([...player], [myCount]));
        setPlayer(_.merge([...player], [myCount]));
    }

    const getToken = (tkn) => {
        const myPlayer = player?.filter( p => p?.id == myAccount?.id )[0];
        
        if(myPlayer.token?.length >= 10){
            alert('보유 가능한 코인 수를 초과했습니다.');
            return;
        }

        myPlayer.token = [...myPlayer.token, tkn];
        
        const _token = _.cloneDeep(token);
        const index = _token[tkn.color].findIndex( t => t?.id === tkn?.id );
        _token[tkn.color].splice(index,1);
        
        /*  
        setToken((t) => {
            const index = t.findIndex( (eachToken) => eachToken?.id === token?.id );
            const popTarget = t.splice(index,1);
            return t;
        }); 
        */

        setPlayer([...player.filter( p => myAccount.id !== p.id ), myPlayer]);
        setToken(_token);
        setMyCount({id: myPlayer?.id});
    }

    const purchaseCard = async (card, deck, setCard, setDeck) => {
        const myPlayer = player?.filter( p => p?.id === myAccount?.id )[0];
        const _token = _.cloneDeep(token);

        let discountedCost = {};
        const cardKeys = Object.keys(card?.cost)?.map( key => key );
        cardKeys.forEach( k => {
            discountedCost[k] = card.cost[k] - ( myPlayer?.bonus?.[k] || 0 );
        });
        
        // const myKeys = Object.keys(myPlayer?.property)?.map( key => key );
        
        let colorCheck = (color) => {
            // 해당 색상 코인 부족하면 return false;
            return (myPlayer?.token?.filter( t => t?.color == color)?.length >= discountedCost[color]);
        }

        // 골드 코인 제외 벨리데이션
        let isInValid = cardKeys.some( k => {
            // 내가 가지고 있는 코인 - 지불 해야하는 코인
            //TODO: gold token 계산에 추가 필요
            return !colorCheck(k);
        })
        
        if(isInValid){
            // 무슨 색 코인이 부족한지 체크, 골드 코인 벨리데이션 추가
            // ex) ["blue","green"]
            const payfilteredCoin = Object.keys(discountedCost)?.filter( t => discountedCost[t] > 0);
            const myYellowCoin = myPlayer?.token?.filter( f  => f?.color == 'yellow' );
            // 지불 해야 하는 코인 수 > 내가 가진 총 코인 수
            const payCoinCnt = _.sum(payfilteredCoin?.map( t => discountedCost[t]));
            const myCoinCnt = ( payfilteredCoin
                                // 내가 가진 지불 해야하는 색상의 코인 수
                                ?.reduce( color => {
                                    return myPlayer?.token?.filter( f  => f?.color == color )
                                } )
                             )
                                + myYellowCoin?.length;

            console.log("돈 부족 !" ,  `object: ${payCoinCnt}, my: ${myCoinCnt}`);
            if(payCoinCnt > myCoinCnt) {
                swal("금액이 부족합니다.  :", `object: ${payCoinCnt}, my: ${myCoinCnt}` );
                return;
            } else {
                // 골드 코인 쓰면 살 수 있음!
                console.log("나의 황금 코인:", myYellowCoin);
                isInValid = await swal({
                    text:`골드 토큰을 사용하여 구매 하시겠습니까?`,
                    buttons: ["아니오","예"]
                });
            }
        } 

        console.log(`isInValid: ${isInValid}`);
        if(!isInValid) return;

        // spendTokens: myPlayer.token - card.cost
        cardKeys.forEach(k => {
            const color = k;
            for(let i = 0; i < discountedCost[color]; i++) {
                let myTokenIdx = -1;
                myPlayer.token?.some((t, idx) => {
                    if(t.color === color) {
                        myTokenIdx = idx;
                        return true;
                    } else return false;
                });
                //해당 컬러의 token이 없을 경우 gold token 소비
                if(myTokenIdx !== -1) { 
                    myPlayer.token?.some((t, idx) => {
                        if(t.color === "yellow") {
                            myTokenIdx = idx;
                            return true;
                        } else return false;
                    });
                } 
                console.log("myTokenIdx", myTokenIdx)
                if(myTokenIdx >= 0) { 
                    const tkn = myPlayer.token.splice(myTokenIdx, 1)[0];
                    console.log("지불한 토큰: ", tkn)
                    _token[color] = [..._token[color], tkn];
                    console.log("_token[color]: ", _token[color])
                }
            }
        });
        
        myPlayer.card = [...myPlayer.card, card];

        setPlayer([...player.filter( p => myAccount.id !== p.id ), myPlayer]);
        setToken(_token);

        const _deck = _.cloneDeep(deck);
        //카드 세팅
        setCard((c) => {
            const index = c.findIndex( (eachCard) => eachCard?.id === card?.id );
            const _c = _.cloneDeep(c);
            if(index >= 0) {
                _c[index] = _deck.splice(0,1)?.[0];
            }
            return _c;
        });
        
        //덱 세팅        
        setDeck(_deck);

        //setMyCount({id: myPlayer?.id});
    }

    const reserveCard = async (card, deck, setCard, setDeck) => {
        let isContinue = true;

        const myPlayer = player?.filter( p => p?.id === myAccount?.id )[0];

        if(myPlayer.reservedCard.length >= 3) {
            alert('카드는 3장까지만 예약할 수 있습니다.');
            return;
        }

        if(token["yellow"]?.length === 0) {
            isContinue = await swal({
                text:`가져올 골드 토큰이 없습니다. 계속 진행하시겠습니까?`,
                buttons: ["아니오","예"]
            })
        }
        
        // 아니오.
        if(!isContinue) return;
        //조건: 황금 코인이 있을때만 
        isContinue && getToken(_.last(token["yellow"]));

        myPlayer.reservedCard = [...myPlayer.reservedCard, card];
        setPlayer([...player.filter( p => myAccount.id !== p.id ), myPlayer]);

        const _deck = _.cloneDeep(deck);
        //카드 세팅
        setCard((c) => {
            const index = c.findIndex( (eachCard) => eachCard?.id === card?.id );
            const _c = _.cloneDeep(c);
            if(index >= 0) {
                _c[index] = _deck.splice(0,1)?.[0];
            }
            return _c;
        });
        
        //덱 세팅        
        setDeck(_deck);

        //setMyCount({id: myPlayer?.id});
    }
    /* 
    const obtainNoble = () => {
        const myPlayer = player?.filter( p => p?.id == myAccount?.id )[0];

        //획득한 보너스가 귀족 획득 조건 만족 시 귀족 획득
        //2개 이상의 귀족을 동시에 만족할 경우 하나 선택
        
        tile.filter((t, idx) => {
            const tileKeys = Object.keys(t?.requiredBonuses)?.map( key => key );
            
            const isObtainable = tileKeys.forEach( key => {
                 if(myPlayer.bonus[key] >= t.requiredBonuses[key]) return ;
                
            }) ? false : true;
            
        })
    } */

    //endTurn
    
    return (
        <Board>
            <CardBundle>
                <Card className={"deck"} img={CardImage} position={"-200% -500%"}>{deck_lv3?.length}</Card>
                {card_lv3.map(item => (
                    <Card key={item.id} img={CardImage} position={item.position} point={point[item.points]} gem={gem[item.bonus]} onClick={(e) => setToggleCard( {...toggleCard, [item.id]: !toggleCard[item.id] } )}>
                        <div className="header">
                            <div className={item.points ? "point" : ""}></div>
                            <div className="bonus_gem"></div>
                        </div>
                        <div className="cost">
                            {Object.entries(item.cost).map( ([gem, cost]) =>
                                <div className={`cost_gem ${gem}`}>
                                    <div className={`cost_count`}>{cost}</div>
                                </div>
                            )}
                        </div>
                        {
                            toggleCard[item.id] && (
                                <CardAction id={item.id} className={"card-over"}>
                                    <article onClick={(e) => purchaseCard(item, deck_lv3, setCard_lv3, setDeck_lv3)}>구매</article>
                                    <article onClick={(e) => reserveCard(item, deck_lv3, setCard_lv3, setDeck_lv3)}>예약</article>
                                </CardAction>
                            )
                        }
                    </Card>
                ))}

                <Card className={"deck"} img={CardImage} position={"-100% -500%"}>{deck_lv2?.length}</Card>
                {card_lv2.map(item => (
                    <Card key={item.id} img={CardImage} position={item.position} point={point[item.points]} gem={gem[item.bonus]} onClick={(e) => setToggleCard( {...toggleCard, [item.id]: !toggleCard[item.id] } )}>
                        <div className="header">
                            <div className={item.points ? "point" : ""}></div>
                            <div className="bonus_gem"></div>
                        </div>
                        <div className="cost">
                            {Object.entries(item.cost).map( ([gem, cost]) =>
                                <div className={`cost_gem ${gem}`}>
                                    <div className={`cost_count`}>{cost}</div>
                                </div>
                            )}
                        </div>
                        {
                            toggleCard[item.id] && (
                                <CardAction id={item.id} className={"card-over"}>
                                    <article onClick={(e) => purchaseCard(item, deck_lv2, setCard_lv2, setDeck_lv2)}>구매</article>
                                    <article onClick={(e) => reserveCard(item, deck_lv2, setCard_lv2, setDeck_lv2)}>예약</article>
                                </CardAction>
                            )
                        }
                    </Card>
                ))}
                <Card className={"deck"} img={CardImage} position={"0 -500%"}>{deck_lv1?.length}</Card>
                {card_lv1.map(item => (
                    <Card key={item.id} img={CardImage} position={item.position} point={point[item.points]} gem={gem[item.bonus]} onClick={(e) => setToggleCard( {...toggleCard, [item.id]: !toggleCard[item.id] } )}>
                        <div className="header">
                            <div className={item.points ? "point" : ""}></div>
                            <div className="bonus_gem"></div>
                        </div>
                        <div className="cost">
                            {Object.entries(item.cost).map( ([gem, cost]) =>
                                <div className={`cost_gem ${gem}`}>
                                    <div className={`cost_count`}>{cost}</div>
                                </div>
                            )}
                        </div>
                        {
                            toggleCard[item.id] && (
                                <CardAction id={item.id} className={"card-over"}>
                                    <article onClick={(e) => purchaseCard(item, deck_lv1, setCard_lv1, setDeck_lv1)}>구매</article>
                                    <article onClick={(e) => reserveCard(item, deck_lv1, setCard_lv1, setDeck_lv1)}>예약</article>
                                </CardAction>
                            )
                        }
                    </Card>
                ))}
            </CardBundle>

            <TokenBundle>
                <TokenPile>
                    {
                        token?.white?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
                <TokenPile>
                    {
                        token?.blue?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
                <TokenPile>
                    {
                        token?.green?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
                <TokenPile>
                    {
                        token?.red?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
                <TokenPile>
                    {
                        token?.black?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
                <TokenPile>
                    {
                        token?.yellow?.map((t,i) => 
                            <Token onClick={(e) => getToken(t)} color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                        )
                    }
                </TokenPile>
            </TokenBundle>

            <TileBundle>
                {tile.map(item => (<Tile key={item.id} img={NobleImage} position={item.position}></Tile>))}
            </TileBundle>
            
            <MyStatus>
                {
                    player?.filter( f => f.id === 'hyesus')?.map( (me, i) => 
                        <div>
                            {Object.keys(me)}
                            <div className="myProperty">내 보석
                                <div className="tokens">{me?.token?.length || 0}/10</div>
                                <TokenBundle style={{flexDirection:"row", gap:"100px", height:"100px", flexWrap: "wrap"}}>
                                    <TokenPile>
                                        {
                                            me?.token?.filter(t => t?.color === "white" )?.map((t,i) => 
                                                <Token color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                                            )
                                        }
                                    </TokenPile>
                                    <TokenPile>
                                        {
                                            me?.token?.filter(t => t?.color === "blue" )?.map((t,i) => 
                                                <Token color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                                            )
                                        }
                                    </TokenPile>
                                    <TokenPile>
                                        {
                                            me?.token?.filter(t => t?.color === "green" )?.map((t,i) => 
                                                <Token color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                                            )
                                        }
                                    </TokenPile>
                                    <TokenPile>
                                        {
                                            me?.token?.filter(t => t?.color === "red" )?.map((t,i) => 
                                                <Token color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                                            )
                                        }
                                    </TokenPile>
                                    <TokenPile>
                                        {
                                            me?.token?.filter(t => t?.color === "black" )?.map((t,i) => 
                                                <Token color={t.color} img={TokenImage} position={t.position} count={i+1}></Token>
                                            )
                                        }
                                    </TokenPile>
                                </TokenBundle>
                                <div className="token">token: {me.token?.filter( t => t?.id?.startsWith("yl") )?.length}</div>
                            </div>
                            <div className="myReservedCard">내가 보관한 카드
                                <div className="counts">{me?.reservedCard?.length || 0}/3</div>
                                
                            </div>
                            <div className="myCard">내가 구매한 카드
                                <div className="counts">{me?.card?.length || 0}</div>
                                
                            </div>
                            <div className="myTile">
                                내 재산 <br/>
                                red: {me?.property.red} <br/>
                                blue: {me?.property.blue} <br/>
                                green: {me?.property.green} <br/>
                                white: {me?.property.white} <br/>
                                black: {me?.property.black} <br/>
                                yellow: {me?.property.yellow} <br/>
                            </div>
                            <div className="myTile">
                                내 귀족 {me?.tile}
                            </div>
                        </div>
                    )
                }
            </MyStatus>
        </Board>
    );
}

export default Splendor;

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;

    background: url(${BackgroundImage});
    background-size: cover;
    background-attachment: fixed;
    padding: 20px;
    height: 100%;
`;

const CardBundle = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 150px 150px 123px;
    grid-gap: 10px;

    flex-basis: fit-content;
    justify-content: center;
    
    opacity: 70%;

    width: 100%;
    height: 550px;
    
    padding: 20px;

    .deck {
        margin-right: 50px;
    }
    z-index: 9;
`;

const Card = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    
    background-image: url(${props => props.img});
    background-position: ${props => props.position};
    background-size: 500% 600%;

    overflow: hidden;
    
    width: 120px;
    height: 160px;
    border: 2px solid #fff;
    box-shadow: -4px 4px 12px #000;
    border-radius: 8px;
    cursor: pointer;

    transform: scale(1);
    // filter: blur(0);
    transition: transform 0.35s, filter 0.1s ease-in-out;
    
    &:hover {
        box-shadow: 0 1vh 6vh rgb(0 0 0 / 20%);
        /* pointer-events: auto; */
        /* opacity: 1; */
        /* transition: transform 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), box-shadow 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), opacity 1ms step-end; */
        /* transition-delay: 900ms; */
        border: 1.5px solid lightgreen;
        transform: scale(1.1);
    }
    
    .header {
        display: flex;
        justify-content: space-between;
        background-color: hsla(0,0%,100%,.5);
    }

    .point {
        background-size: 1000% 300%;
        background-image: url(${NumberSheet});
        background-position-x: ${props => props.point};
        background-position-y: -200%;
        width: 40px;
        height: 40px;
        /* position: relative; */
    }

    .bonus_gem {
        background-size: 500% 100%;
        background-image: url(${GemImage});
        background-position-x: ${props => props.gem};
        width: 40px;
        height: 35.3685px;
        /* position: absolute;
        top: 2px;
        right: 5px; */
        margin: 5px;
    }

    .cost {
        position: absolute;
        bottom: 5px;
        right: 5px;
        display: flex;
        flex-direction: column;

        box-shadow: 0 1vh 6vh rgb(0 0 0 / 20%);
        pointer-events: auto;
        opacity: 1;
        transition: transform 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), box-shadow 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), opacity 1ms step-end;
        transition-delay: 900ms;

        background-color: hsla(0,0%,100%,.5);
        border-radius: 5px;
        border: 1px solid black;
}
    }
    
    .cost_gem {
        transform: scale(0.8);
        position: relative;
        width: 25px;
        height: 23.3685px;
        background-size: 500% 100%;
        background-image: url(${GemImage});
    }

    .cost_count {
        position: absolute;
        right: 0px;
        top: -5px;

        color: white;
        font-weight: bold;
        font-size: 18px;
    }
    
    .red { background-position-x: ${gem?.red}; }
    .white { background-position-x: ${gem?.white}; }
    .black { background-position-x: ${gem?.black}; }
    .blue { background-position-x: ${gem?.blue}; }
    .green { background-position-x: ${gem?.green}; }
    
`;

const CardAction = styled.div`
    position: absolute;
    background: black;
    opacity: 70%; 
    height: 100%;
    width: 100%;
    color: white;
`;

const TokenBundle = styled.div`
    display: flex;
    flex-direction: column;

    gap: 20px;
    margin: 15px;

    width: 100px;
    height: 550px;
`;

const Token = styled.article`
  background-image: url(${props => props.img});
  background-position: ${props => props.position};
  background-size: 600% 100%;
  border-radius: 50%;

  width: 80px;
  height: 80px;

  cursor: pointer;

  position: absolute;
  margin-top: -${props => props.count * 6}px;

  transform: scale(1);
  transition: transform 0.35s, filter 0.1s ease-in-out;
    
  &:hover {
      box-shadow: 0 1vh 6vh rgb(0 0 0 / 20%);
      /* pointer-events: auto; */
      /* opacity: 1; */
      /* transition: transform 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), box-shadow 900ms cubic-bezier(0.785, 0.135, 0.15, 0.86), opacity 1ms step-end; */
      /* transition-delay: 900ms; */
      border: 1.5px solid lightgreen;
      transform: scale(1.1);
  }
`;

const TokenPile = styled.div`
    position: relative;
    margin-top: 65px;
`;

const TileBundle = styled.div`

`;

const Tile = styled.div`
    width: 110px;
    height: 110px;
    border: 2px solid #fff;
    border-radius: 8px;
    margin: 15px;
    display: grid;
    background-color: #ffebcd;
    background-size: 500% 200%;
    background-image: url(${props => props.img});
    background-position: ${props => props.position};
    box-shadow: -4px 4px 12px #000;
    cursor: pointer;
`;

const MyStatus = styled.div`
    flex: 1;
    
    display: flex;
    border: 5px solid green;
`;
