//Declare Deck, Wallet
deck = ['A♦', 'K♦', 'Q♦', 'J♦', '10♦', '9♦', '8♦', '7♦', '6♦', '5♦', '4♦', '3♦', '2♦', 'A♠', 'K♠', 'Q♠', 'J♠', '10♠', '9♠', '8♠', '7♠', '6♠', '5♠', '4♠', '3♠', '2♠', 'A♣', 'K♣', 'Q♣', 'J♣', '10♣', '9♣', '8♣', '7♣', '6♣', '5♣', '4♣', '3♣', '2♣', 'A♡', 'K♡', 'Q♡', 'J♡', '10♡', '9♡', '8♡', '7♡', '6♡', '5♡', '4♡', '3♡', '2♡']
debug = ['A♣', 'A♠', '10♠', 'A♦', '3♡', '5♣', '7♦', 'J♠', 'K♠', 'K♦', 'K♣', '6♣', 'Q♡', 'Q♠', 'J♡', 'K♡', '10♦', '9♦', '6♠', '9♠', '2♠', '7♣', 'J♦', '9♡', '4♡', '3♣', '7♠', '3♠', '5♦', '10♣', '6♡', 'J♣', '2♡', '9♣', '5♠', '7♡', '10♡', '4♠', '2♦', '4♦', '4♣', '5♡', 'Q♣', '8♦', '8♣', '6♦', '3♦', '2♣', 'Q♦', '8♠', '8♡', 'A♡']
wallet = 1000
your_hand = []
player2_hand = []
player3_hand = []
player4_hand = []
dealer_hand = []
yourBet = 0
//Commence Betting
function bet(amount) {
    currentWallet = document.getElementById('wallet').innerHTML
    yourBet = amount
    document.getElementById('wallet').innerHTML = currentWallet - amount
}
//Deal Deck of Card to four Players and Dealer (One card up 1 down) - CONFIRMED WORKS
function shuffle() {
    //array = ['A♦', 'K♦', 'Q♦', 'J♦', '10♦', '9♦', 'A♠', 'K♠', 'Q♠', 'J♠', '10♠', '9♠', 'A♣', 'K♣', 'Q♣', 'J♣', '10♣', '9♣', 'A♡', 'K♡', 'Q♡', 'J♡', '10♡', '9♡']
    let array = [...deck]
    let arr = []
    while (array.length > 0) {
        var b = Math.floor(Math.random() * array.length)
        arr.unshift(array[b]);
        array.splice(b, 1)
    }
    console.log(arr)
    return arr
}

function deal() {
    array = shuffle()
    //only used for debugging the Aces issue
    //array = debug
    while (your_hand.length < 2) {
        your_hand.unshift(array[0]);
        array.splice(0, 1)
        //console.log(array) 
    }
    while (player2_hand.length < 2) {
        player2_hand.unshift(array[0]);
        array.splice(0, 1)
        //console.log(array) 
    }
    while (player3_hand.length < 2) {
        player3_hand.unshift(array[0]);
        array.splice(0, 1)
        //console.log(array)
    }
    while (player4_hand.length < 2) {
        player4_hand.unshift(array[0]);
        array.splice(0, 1)

    }
    while (dealer_hand.length < 2) {
        dealer_hand.unshift(array[0]);
        array.splice(0, 1)

    }
    console.log(your_hand, player2_hand, player3_hand, player4_hand, dealer_hand)
    let create = { yourhand: your_hand, player2hand: player2_hand, player3hand: player3_hand, player4hand: player4_hand, dealer: dealer_hand }
    return create
}
function dealCards() {
    create = deal()
    //console.log(create)
    document.getElementById('hand1').innerHTML = create.yourhand
    document.getElementById('hand2').innerHTML = create.player2hand
    document.getElementById('hand3').innerHTML = create.player3hand
    document.getElementById('hand4').innerHTML = create.player4hand
    document.getElementById('center').innerHTML = create.dealer
    document.getElementById('score').innerHTML = count(create.yourhand)
    return create
}

function hit() {
    arr = document.getElementById('hand1').innerHTML.split(",")
    question = count(arr)
    if (question == `BUST`) {
        document.getElementById('score').innerHTML = `BUST`
        document.getElementById('hit').innerHTML = ""
        return
    } else {
        document.getElementById('score').innerHTML = question
        // console.log(typeof arr, arr, array)
        arr.push(array[0])
        array.shift([0])
        console.log(arr, array)
        document.getElementById('hand1').innerHTML = arr
        document.getElementById('score').innerHTML = count(arr)
    }

}

function aiHit(risk, playerScore, playerTag) {

    arr = document.getElementById(playerTag).innerHTML.split(",")
    question = count(arr)
    console.log(risk, question)
    if (question >= risk) {
        document.getElementById(playerScore).innerHTML = question
        return
    }
    if (question == `BUST`) {
        document.getElementById(playerScore).innerHTML = `BUST`
        return
    } else {
        document.getElementById(playerScore).innerHTML = question
        // console.log(typeof arr, arr, array)
        arr.push(array[0])
        array.shift([0])
        console.log(arr, array)
        document.getElementById(playerTag).innerHTML = arr
        document.getElementById(playerScore).innerHTML = count(arr)
    }

}
function bust(scr){
    if (scr === "BUST"){
        return scr = 0
    }
    return scr
}

function compareScores() {
    scr1 = bust(document.getElementById("score").innerHTML)
    scr2 = bust(document.getElementById("score2").innerHTML)
    scr3 = bust(document.getElementById("score3").innerHTML)
    scr4 = bust(document.getElementById("score4").innerHTML)
    scr5 = bust(document.getElementById("score5").innerHTML)
    console.log(scr1,scr2,scr3,scr4,scr5)
    //Currently the scroes are strins and need to be converted to numbers
    if (scr1 > scr2 && scr1 > scr3 && scr1 > scr4 && scr1 > scr5){
        console.log(`Winner ${yourBet} times 2 has been added to your total`)
        document.getElementById('wallet').innerHTML = document.getElementById('wallet').innerHTML + (yourBet * 2)
    } else if (scr1 >= scr2 && scr1 >= scr3 && scr1 >= scr4 && scr1 >= scr5){
        console.log(`Push ${yourBet} has been re-added to your total`)
        document.getElementById('wallet').innerHTML = document.getElementById('wallet').innerHTML + (yourBet)
    } else{
        console.log(`You lose ${yourBet}. Try again`)
    }


}
function stay() {
    aiHit(15, 'score2', 'hand2')
    aiHit(14, 'score3', 'hand3')
    aiHit(17, 'score4', 'hand4')
    aiHit(16, 'score5', 'center')
    compareScores()
}

//Show current amount of points - create function so that it can be used evrytime card is added to the array it wil
function count(arr) {
    let count = 0
    create = arr

    for (card of create) {
        if (card == 'K♦' || card == 'Q♦' || card == 'J♦' || card == '10♦' || card == 'K♠' || card == 'Q♠' || card == 'J♠' || card == '10♠' || card == 'K♣' || card == 'Q♣' || card == 'J♣' || card == '10♣' || card == 'K♡' || card == 'Q♡' || card == 'J♡' || card == '10♡') {
            count += 10
        }

        if (card == '9♦' || card == '9♣' || card == '9♠' || card == '9♡') {
            count += 9
        }

        if (card == '8♦' || card == '8♣' || card == '8♠' || card == '8♡') {
            count += 8
        }

        if (card == '7♦' || card == '7♣' || card == '7♠' || card == '7♡') {
            count += 7
        }

        if (card == '6♦' || card == '6♣' || card == '6♠' || card == '6♡') {
            count += 6
        }

        if (card == '5♦' || card == '5♣' || card == '5♠' || card == '5♡') {
            count += 5
        }

        if (card == '4♦' || card == '4♣' || card == '4♠' || card == '4♡') {
            count += 4
        }

        if (card == '3♦' || card == '3♣' || card == '3♠' || card == '3♡') {
            count += 3
        }

        if (card == '2♦' || card == '2♣' || card == '2♠' || card == '2♡') {
            count += 2
        }
        if (card == 'A♦' || card == 'A♣' || card == 'A♠' || card == 'A♡') {
            count += 11
            // if (count > 21) {
            //     count = count - 10
            // }

        }
    }
    //Moved this section out of the for loop as it was creating issues with the count. Testing for viability will now commence
    //I WOULD SAY THE COUNING BUG IS FIXED AS NO ISSUES HAVE BEEN REPORTED
    console.log("Apples", count)
    if (count > 21) {
        let mix = 0
        for (card of create) {
            console.log("banana", create)
            //Taking out mix > 1
            if ((card == 'A♦' || card == 'A♣' || card == 'A♠' || card == 'A♡') && count > 21) {
                count = count - 10
                mix += 1

            }
            console.log(count, card, mix)
        }
        console.log("Beans", count)
        if (count > 21) {
            return count = `BUST`
        }

        //return count = `BUST`
    }
    if (count > 21) {
        return count = `BUST`
    }



    return count
    //Will need w||k in the future - first card creates an issue. Will not change back to 1 after count is 11. (Is it possible to re-count after cards are delt?)

}

