  1. Game setup
      - Shuffle each development card deck separately, and then place them in a column in the middle of the table in increasing order from bottom to top.
      - Then reveal 4 cards from each level.
      - Shuffle the noble Tiles and reveal as many of them as there are players plus one (example: 5 Tiles for a 4 player game).
      - The remaining Tiles are removed from the game; they will not be used during the game. 
      - Finally, place the tokens in 6 distinct piles (sort them by color) within reach of the players.

  2. Play game
    - The youngest player begins.
    - On turn, player can do one of the things below.
        i. get/takeTokens - 3 gem of different colors OR 2 gem of the same color
       ii. reserveCard, getGoldToken(joker), revealCard
      iii. purchase/acquireCard, spendTokens, discountCostsWithAcquiredBonuses, revealCard
    - obtainTile(visit from noble)
    - End of every turn, prestige points are counted
    
  3. End of the game
    - When a player reaches 15 prestige points, complete the current round so that each player has played same number of turns.
    - Highest number of prestige points is declared the winner


  게임 :
    룰
    -> 내가 가진 코인 계산 ( 1,2,3 셋중 하나 행동 )
    -> 남은 코인 수
    -> 카드 리필 (구매 또는 예약 시)
          To reserve a card, a player simply needs to take a face-up development from the middle of the table or (if you’re feeling
          lucky) draw the first card from one of the three decks without showing it to the other players.
          If there is no gold left, you can still reserve a card, but you won’t get any gold.
          Developments in hand may only be purchased by the players holding them.
    -> 불로소득 (상황에 따라서)
    -> 귀족 획득 (상황에 따라서) 
    -> 점수 계산

    (반복)

    카드 : 귀족, 부동산 (서울, 경기, 지방) => 구매 또는 자동획득
    코인 : 부동산 + 보석 => 채굴 또는 불로소득


    # 부동산 - development cards
    0. ID
    1. 타입(서울, 경기, 지방) - level
    - 40 level 1
    - 30 level 2
    - 20 level 3
    2. 보상 - bonuses (These bonuses allow players to purchase subsequent development cards for a lesser cost)
    3. 가격 { # 코인 } - costs
    4. 점수 - prestige points

    # 귀족 - The nobles (noble Tiles) 10
        At the end of their turn, a player automatically receives the visit from
        a noble if that player has the amount of bonuses (and only
        bonuses) required, and they get the corresponding Tile
    1. 조건 - required bonuses
    2. 점수 - prestige points

    # 코인 - token
    0. ID
    1. 타입 보석(gem)의 유형 
    (4,  3,  2 players)
    - 7   5   4 Emerald(green)
    - 7   5   4 Sapphire(blue)
    - 7   5   4 Ruby(red)
    - 7   5   4 Diamond(white)
    - 7   5   4 Onyx(black)
    - 5   5   5 Gold Joker(yellow)





게임 : 
    룰 -> 순서 (나) 
    -> 내가 가진 코인 계산 ( 1,2,3 셋중 하나 행동 ) 
    -> 남은 코인 수 
    -> 카드 리필 (상황에 따라서) 
    -> 불로소득 (상황에 따라서) 
    -> 귀족 획득 (상황에 따라서) 
    -> 점수 계산 

    다음순서 (너) ( 1,2,3 셋중 하나 행동 ) 
    -> 남은 코인 수 
    -> 카드 리필 (상황에 따라서) 
    -> 불로소득 (상황에 따라서) 
    -> 귀족 획득 (상황에 따라서) 
    -> 점수 계산 

    -> 반복 
        
    카드 : 귀족, 부동산 (서울, 경기, 지방) => 구매 또는 자동획득 
    코인 : 부동산 + 보석 => 채굴 또는 불로소득

# 부동산
0. ID
1. 타입(서울, 경기, 지방)
2. 보상 
3. 가격 { # 코인 }
4. 점수

# 귀족
1. 조건
2. 포인트

# 코인
0. ID
1. 타입 보석의 유형
//2. 총갯수
//3. 잔여갯수
coin = [
         { id:1, type : red, count : 5}
        ,{ id:2, type : blue, count : 4}
        ,{ id:3, type : black, count : 2}
    ]

# 유저
0. ID
1. 포인트
2. 코인 [타입, 겟수]
========================================
- 보,혜
    coin = [
        { type : red, count : 1}
        { type : blue, count : 1}
        { type : black, count : 1}
    ]
========================================
- 나
    coin = [ # 코인, # 코인, # 코인, #코인 ];

3. 부동산카드 [# 부동산]
4. 귀족카드 [# 귀족]
5. 예약카드 [카드]


// 판
Componant Board () {
    const [user, setUser] = useState([
        # User{},
        # User{}
    ])

    // # 코인 { 아이디: 1, 타입: 빨강 }
    전체코인 = [# 코인, ~ 20개];

    빨강: [전체코인.필터(타입: 빨강)]
    파랑: [전체코인.필터(타입: 파랑)]
    초록: 전체코인.필터(타입: 초록)
    흰:  전체코인.필터(타입: 흰)
    초코: 전체코인.필터(타입: 초코)

    황금: 전체코인.필터(타입: 황금)

    서울부동산: [# 부동산].필터(타입)
    경기부동산: [# 부동산].필터(타입)
    지방부동산: [# 부동산].필터(타입)


   return (
       <div>
            <User nickName={"Sleeping-Eyes"} coin={} >
       </div>
   )
    

    //구매 
    
    // 내 차례
    나 {
        부동산: [#부동산 { 보상 }]
    }

   

} // BOARD

 //컴포넌트
    const User = (props) => {
        const nickName = props.nickName || "UNKNOWN";
        const coin = props.coin ||[];
        const house = props.house || [];
        const booking = props.booking || [];
        
         순서 (나) 
        -> 내가 가진 코인 계산 ( 1,2,3 셋중 하나 행동 ) 
         빨강: [coin.필터(타입: 빨강)]
         파랑: [coin.필터(타입: 파랑)]
         초록: coin.필터(타입: 초록)
         흰:  coin.필터(타입: 흰)
         초코: coin.필터(타입: 초코)

         GOLD: coin.filter(type: gold)

        

        -> 남은 코인 수 
        -> 카드 리필 (상황에 따라서) 
        -> 불로소득 (상황에 따라서) 
        -> 귀족 획득 (상황에 따라서) 
        -> 점수 계산
    }