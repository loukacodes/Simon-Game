/*================================================
	CLASSIC SIMON GAME CREATED FOR FREECODECAMP
	FRONT END PROJECT.
==================================================*/

/*==================================================
Process update:
- counter content must be return to its initial state
when player click off during the game
- add more speed when player reachs certain level
- add strict mode
- limit the number of level, 20 is maximum
- adjust the timer each time go to the next stage
//After finished all these things, give yourself a big
round of applause!

Bravo! you reach the end of the path to become a
front end developer. Now you can call yourself a
front end developer!!!
====================================================*/

/*Initial State*/
var playerSequence = []; //place holder for what pad user clicked
var Sequence = []; //place holder for what number computer generated
var speed = 1;
var level = 1;

/*DOM*/
var $redLight = $("#red-light"); //red light for strict button
var $strictModeButton = $("#strict-mode");
var $switchButton = $("#switch-button");
var $counterContent = $("#counter-content");
var $startGame = $("#start");
var checkBox = $("input[id='switch-button']");

/*Audio input*/
var redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var error = new Audio("https://freesound.org/people/Bertrof/sounds/131657/download/131657__bertrof__game-sound-wrong.wav");
var intro = new Audio("https://freesound.org/people/rivernile7/sounds/246495/download/246495__rivernile7__intro-scratch.wav");

$(document).ready(function() {
  //handle all DOM manipulation in here
  $switchButton.click(switchState);
  $strictModeButton.click(strictMode);
  $startGame.click(start);
  $("#1, #2, #3, #4").mouseup(function() {
    $(this).removeClass("clicked");
  }).mousedown(updatePlayerSequence);

});


function strictMode() {

  $redLight.toggleClass("active");

}

function isStrictModeOn() {
//check if strict mode is on and return its state
  if ($redLight.hasClass("active")) {
    return true;
  } else {
    return false;
  }
}

function switchState(checkBox) {
//toggle class of all button, turn them into active when switch is ON and vice versa
checkBox = $("input[id='switch-button']");
  if(checkBox.is(':checked')) {
    intro.play();
    $counterContent.removeClass("inactive").html("--").addClass("active");;
  	$strictModeButton.removeClass("unclickable");
    $startGame.removeClass("unclickable");
  } else {
    $counterContent.addClass("inactive").html("--").removeClass("active");;
  	$strictModeButton.addClass("unclickable");
    $startGame.addClass("unclickable");
    $("#message").html("");
    Sequence = [];
    playerSequence = [];
  }
}

function start() {
  level = 1;
  playerSequence = [];
  Sequence = [];
  $counterContent.html(level);
  updateSequence(level);
}

function updateLevel() {
//20 is the maximum level
  if (level < 20) {
    level++;
      setTimeout(function() {
        $counterContent.html(level);
      },1000); //delay the display of level in 1s
    updateSequence(level);
    return level;
  } else { //else level is greater than 20, it means player won
    $("#message").html("YOU WIN!!!").fadeIn("slow").fadeOut("slow");
    checkBox.attr('checked', false); //stop the game
    return switchState(checkBox);
  }

}

function updateSequence(num) {
  //receive level as an argument and increment the length of Sequence

  for (var i = 0; i < num; i++) {
    var randomNum = Math.floor(Math.random() * 4) + 1;
    Sequence.push(randomNum);
  }
  return setTimeout(function() {return displaySequence(Sequence);}, 2000);
}

function displaySequence(Sequence) {

  for (var j = 0; j < Sequence.length; j++) {
    (function(j){

      setTimeout(function(){
        if (!checkBox.is(":checked")) {
          return;
        }
        switch (Sequence[j]){
          case 1:
            redAudio.play();
            $("#1").addClass("clicked");
            setTimeout(function() { $("#1").removeClass("clicked"); }, 500);
            break;

          case 2:
            blueAudio.play();
            $("#2").addClass("clicked");
            setTimeout(function() { $("#2").removeClass("clicked"); }, 500);
            break;

          case 3:
            yellowAudio.play();
            $("#3").addClass("clicked");
            setTimeout(function() { $("#3").removeClass("clicked"); }, 500);
            break;

          case 4:
            greenAudio.play();
            $("#4").addClass("clicked");
            setTimeout(function() { $("#4").removeClass("clicked"); }, 500);
            break;

          default:
            break;
        }
      }, j * 1000);

    }(j));

  }
}



function updatePlayerSequence() {

    if(playerSequence.length < Sequence.length) {
      playerSequence.push(this.id);
        switch (this.id){
          case "1":
            redAudio.play();
            $("#1").addClass("clicked");
            break;

          case "2":
            blueAudio.play();
            $("#2").addClass("clicked");
            break;

          case "3":
            yellowAudio.play();
            $("#3").addClass("clicked");
            break;

          case "4":
            greenAudio.play();
            $("#4").addClass("clicked");
            break;

          default:
            break;
        }
    }
    return isMatch();
}

function notMatch() {

  var isItOn = isStrictModeOn();
    $counterContent.html("!!");
      for (var i = 0; i < 3; i++) { //"!!" blinks 3 times
        $counterContent.fadeTo("fast",0).fadeTo("fast", 1.0);
      }
      setTimeout(function() {error.play();},200);
    if (isItOn === false) {
      setTimeout(function() {$counterContent.html(level);},1000);
      playerSequence = [];
        setTimeout(function() {return displaySequence(Sequence);},2000);
    } else if (isItOn === true) {
        return setTimeout(start,2000);
    }

}


function isMatch() {

      // if there's just 1 different pair of numbers, 2 sequences are not match
		if(playerSequence[playerSequence.length -1] != Sequence[playerSequence.length -1]) {
        return notMatch();
    } else {
        for(var i = 0; i < Sequence.length; i++) {
          if(playerSequence.length == Sequence.length &&
            playerSequence[i] == Sequence[i]) {
              playerSequence = [];
                Sequence = [];
          		    return updateLevel();
            }
        }
      }

}
