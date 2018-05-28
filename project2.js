$(document).ready(function () {
    var deck = [];
    var suits = ["spades", "diamonds", "clubs", "hearts"];
    var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    /********** Set Deck **********/

    function getDeck() {
        var deck = new Array();
        for (var i = 0; i < suits.length; i++) {
            for (var x = 0; x < values.length; x++) {
                var card = {
                    Value: values[x],
                    Suit: suits[i]
                };
                deck.push(card);
            }
        }

        return deck;
    }

    var deck = getDeck()

    /********** Shuffled **********/
    var cards = [];
    for (var i = 0; i < 52; i++) {
        var shuffled = Math.floor((Math.random() * deck.length)) //Shuffled Cards
        cards.push(deck[shuffled]);
        deck.splice(shuffled, 1)

    }

    console.log(cards)

    /************ Ground Cards ************/

    var arrGround = [];
    for (var r = 0; r < 4; r++) {

        if (cards[r].Value != "jack") {
            $("#ground").append($('<img>').attr("src", cards[r].Value + "_of_" + cards[r].Suit+ ".png").attr("value", cards[r].Value).css({
                width: "100px",
                height: "120px"
            }));

            arrGround.push(cards[r].Value);
        } else {
            do {
                var k = Math.floor((Math.random() * cards.length))
                cards.splice(r, 1, k)

            }
            while (cards[k] != "jack")
            $("#ground").append($('<img>').attr("src", cards[k].Value +"_of_" + cards[k].Suit +".png").css({
                width: "100px",
                height: "120px"
            }))
            arrGround.push(cards[k].Value);

        }
        cards.splice(r, 1);

    }
    
    /************** Click For Play **************/
    
    
$("#base").on("click", function () {
    
         /********** Player Cards ********/
    for (var i = 0; i < 4; i++) {
        $(".first").append($('<img>').attr("src", cards[i].Value + "_of_" + cards[i].Suit + ".png").attr("value", cards[i].Value).css({
            width: "100px",
            height: "120px"
        }))
        cards.splice(i, 1)
    }
    
        /******************* Computer Cards ********************/

    for (var j = 0; j < 4; j++) {
        $(".third").append($('<img>').attr("src", "facedown.png").attr("value", cards[j].Value).attr("title",cards[j].Suit).css({
            width: "100px",
            height: "120px"
        }))
        
        cards.splice(j, 1)
    }

});
    
    /************************ Let's Play ************************/
    var arrScore = [];
    var result = 0;
    var count = 0;
    var soocer = 0;
    var basra = document.getElementById('win');
    
     $(".first").on("click", "img", function () {
        var _this = $(this);
        var pic = $(this).attr("src"); //ba2lo harly  src & value
        var val = $(this).attr("value");
        var flag = true;
           /************ Capturing the matching ***********/
        function capture(b,p){
            debugger;
        for (var i = 0; i < arrGround.length; i++) {
            if (arrGround[i] == b) {
                if (arrGround.length == 1) {
                  count = count + 8;
                 basra.css("display","block")
                }
                arrGround.splice(i, 1)
                arrScore.push(arrGround[i])
                $("#ground > img").eq(i).remove()
                 p.remove();
                arrScore.push(val)
                console.log("check for score >>>>" + arrGround[i], arrScore)
                count = count + 2;
                flag = false;

                continue;

            }

        }
    }
        
         capture(val,_this);
                /********* Hey Jack *********/
    function jack(x, y,z) {
      if ((x == "jack" && arrGround.length != 0) || (z == "7_of_diamonds.png" && arrGround.length != 0)) {
          count = count + arrGround.length + 1;
          arrGround.splice(0, arrGround.length);
          console.log("ground after jack>>>>>>>>" + arrGround)
          $("#ground").empty();
          flag = false;
      }
      y.remove()
  }
  jack(val, _this,pic);
         
          /*****************let's sum***********************/

        function sum(equal,elem){
        for (var x = 0; x < arrGround.length; x++) {
            for (var r = x + 1; r < arrGround.length; r++) {
                console.log(parseInt(arrGround[x]) + parseInt(arrGround[r]))
                if (parseInt(arrGround[x]) + parseInt(arrGround[r]) == parseInt(equal)) {
                    if (arrGround.length == 2) {
                        count = count + 7
                    }
                    $("#ground img").eq(r).remove();
                    arrGround.splice(r, 1);
                    $("#ground img").eq(x).remove();
                    arrGround.splice(x, 1);
                    elem.remove();
                    flag = false;
                    x = 0;
                    r = 1;
                    count = count + 3;

                }
                
                for (var z = r + 1; z < arrGround.length; z++) {
                    result = parseInt(arrGround[x]) + parseInt(arrGround[r]) + parseInt(arrGround[z]);
            
                    if (result == parseInt(equal)) {
                        if (arrGround.length == 3) {
                            count = count + 6;
                        }
                        $("#ground img").eq(z).remove();
                        arrGround.splice(z, 1);
                        $("#ground img").eq(r).remove();
                        arrGround.splice(r, 1);
                        $("#ground img").eq(x).remove();
                        arrGround.splice(x, 1);
                        elem.remove();
                        flag = false;
                        x = 0;
                        r = x + 1;
                        z = r + 1;
                        count = count + 4;

                    }

                }
            }

        }
        }

        sum(val,_this);
        var score1 = document.getElementById("score1");
        score1.innerHTML = count;

        /***********appending on the ground ****************/
        if (flag == true) {
            var groundPic = $("#ground").append($("<img>").attr("src", pic).attr("value", val).css({
                width: "100px",
                height: "120px"
            }));
            $(this).remove()

            arrGround.push(val);
        }
    /********************************  ana Computer :)*************************/
         
         setTimeout(function () {
             flag = true;
            var tPic = $(".third img").eq(0).attr("src");
            var tVal = $(".third img").eq(0).attr("value");
            console.log(tVal, tPic);
            var flag = true;
             var mat = $(".third img").eq(0);
            var appendPic = $(".third img").eq(0).attr("title");
             var reSrc = tVal + "_of_" + appendPic + ".png"
           capture(tVal,mat);
        /**************hey Jack***********/
             jack(tVal, mat,reSrc);
             
             sum(tVal,mat)
            if (flag == true) {
            var groundPic = $("#ground").append($("<img>").attr("src", reSrc).attr("value", tVal).css({
                width: "100px",
                height: "120px"
            }));
            $(this).remove()

            arrGround.push(val);
        }

         },2000)
         
         
         

});/********End of first*********/

});/******** End of Function**********/