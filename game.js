var buttonCollors = new Array("red", "blue", "green", "yellow");
var gamePattern = new Array();
var userClickedPattern = new Array();
var hasStarted = "false";
var lost = "false";
level = 0;
$(document).keypress(function(event) {
  if(event.key == "a" && hasStarted == "false") {
    $("#level-title").text("Level " + level);
    nextSequence();
    hasStarted = "true";
  }
});
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonCollors[randomNumber];
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {  $("#" + currentColor).removeClass("pressed") }, 100);
}
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(() => { nextSequence(); }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => { $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver();
  }
}
function startOver() {
  hasStarted = "false";
  gamePattern = [];
  level = 0;
}
