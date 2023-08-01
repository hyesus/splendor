import React, { useState } from "react";
import swal from "sweetalert";
import styled from "styled-components";
import nobleData from "./resources/data/noble.json";
import CardImage from "./resources/images/cards.webp";
import NobleImage from "./resources/images/nobles.jpeg";
import TokenImage from "./resources/images/tokens.webp";
import GemImage from "./resources/images/gems.webp";
import NumberSheet from "./resources/images/numbers_sheet.webp"

const gem = {
    white: "0",
    blue: "-100%",
    black: "-200%",
    red: "-300%",
    green: "-400%"
};

export default (props) => {
    const [myAccount, setMyAccount] = useState({id: "hyesus", win: 0, lose: 0});

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

    const [player, setPlayer] = useState([
        {
            id: "hyesus",
            card: [], // 구매한 카드
            reservedCard: [], // 예약한 카드
            tile: ["nb01", "nb07"], // 획득한 귀족 카드
            token: [], // 가져온 gem 토큰
            bonus: { // 구매한 카드로부터 얻어진 보너스 gem
                white: 1,
                blue: 2,
                green: 1,
                red: 1,
                black: 1
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

    
    return (
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
                        <div className="myTile">
                            내 귀족 {me?.tile}
                        </div>
                    </div>
                )
            }
        </MyStatus>
    );
}

const MyStatus = styled.div`
    flex: 1;
    
    display: flex;
    border: 5px solid green;
`;
