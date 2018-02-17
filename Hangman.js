
var View = {
		welcomePage: function() {
			document.getElementById("welcome").style.display = "block";
			document.getElementById("game").style.display = "none";
			document.getElementById("multiPage").style.display = "none";
		},
		gamePage: function() {
			document.getElementById("game").style.display = "block";
			document.getElementById("welcome").style.display = "none";
			document.getElementById("multiPage").style.display = "none";

		},
		multiPage: function() {
			document.getElementById("multiPage").style.display = "block";		
			document.getElementById("game").style.display = "none";
			document.getElementById("welcome").style.display = "none";
		},

		drawing: function() {
		        var canvas = document.getElementById('canvas');
		        if (canvas.getContext) {
		          var ctx = canvas.getContext('2d');
			//main beam
			ctx.fillRect(80, 100, 15, 350);
			//bottom beam
			ctx.fillRect(30, 450, 150, 15);
			//top beam
			ctx.fillRect(80, 85, 140, 15);
			//cross beam
			ctx.beginPath();
			ctx.moveTo(80, 150);
			ctx.lineTo(125, 85);
			ctx.lineTo(140, 100);
			ctx.lineTo(95, 165);
			ctx.lineTo(80, 150);
			ctx.stroke();
			ctx.fill()
			//rope
			ctx.moveTo(210, 100);
			ctx.lineTo(210, 150);
			ctx.stroke();
			ctx.closePath();
            }
      },
      	drawHead: function() {
      		var canvas = document.getElementById('canvas');
		        if (canvas.getContext) {
		          var ctx = canvas.getContext('2d');
		          ctx.beginPath();
		          ctx.arc(210, 176, 26, 0, Math.PI*2); //head
		          ctx.closePath();
		          ctx.stroke();
		          ctx.moveTo(200, 168) //left eye
		          ctx.arc(200, 168, 4, 0, 2*Math.PI);
		          ctx.closePath();
		          ctx.stroke();
		          ctx.closePath();
		          ctx.moveTo(219, 168); //right eye
		          ctx.arc(219, 168, 4, 0, 2*Math.PI);
		          ctx.stroke();
		          ctx.closePath();
		          ctx.moveTo(200, 186); //mouth
		          ctx.lineTo(220, 186);
		          ctx.stroke();
		      }
		  },
		drawBody: function() {
	    	var canvas = document.getElementById('canvas');
	        if (canvas.getContext) {
	          var ctx = canvas.getContext('2d');
	          ctx.moveTo(210, 202);
	          ctx.lineTo(210, 280);
	          ctx.stroke();
		    }
      	},
      	drawRightLeg: function() {
      		var canvas = document.getElementById('canvas');
		    if (canvas.getContext) {
		      var ctx = canvas.getContext('2d');
		      ctx.moveTo(210, 280);
		      ctx.lineTo(250, 340);
		      ctx.stroke();
		  }

      	},
      	drawLeftLeg: function() {
      		var canvas = document.getElementById('canvas');
	        if (canvas.getContext) {
	          var ctx = canvas.getContext('2d');
	          ctx.moveTo(210, 280);
	          ctx.lineTo(170, 340);
	          ctx.stroke();
	      }
      	},
      	drawRightArm: function() {
      		var canvas = document.getElementById('canvas');
	        if (canvas.getContext) {
	          var ctx = canvas.getContext('2d');
	          ctx.moveTo(210, 215);
	          ctx.lineTo(170, 265);
	          ctx.stroke();
	      }
      	},
      	drawLeftArm: function() {
      		var canvas = document.getElementById('canvas');
	        if (canvas.getContext) {
	          var ctx = canvas.getContext('2d');
	          ctx.moveTo(210, 215);
	          ctx.lineTo(250, 265);
	          ctx.stroke();
	      }
      	},
		render: function(phrase) {
			//console.log(phrase);
			var phraseArr = phrase.toLowerCase().split("");
			phraseArr.forEach(function(el) {
				var elementTD = document.getElementsByTagName("tr")[0];
			    var td = document.createElement("td");
			    if (el === " ") {
			    	td.className = "blankCell";
			    	elementTD.appendChild(td);
			    } else {
				    var tdclasses = td.classList;
				    tdclasses.add("tableCell");
				    tdclasses.add(el);
				    elementTD.appendChild(td);
				}
			});
		},
		displayMessage: function(msg) {
			messageArea = document.getElementById("messageArea");
			messageArea.innerHTML = msg;
		},
}

var Model = {
		button: function() {
			var butt = document.getElementById("button").addEventListener("click", this.startMainPage);
			var listen = document.getElementById("button").addEventListener("click", this.getPhraseFromInput);
		},
		getPhraseFromInput: function() {
			var phrase = document.getElementById("form").value;
			View.render(phrase);
			Model.thePhrase = phrase;
		},
		randomPhrase: function () { //returns a random phrase
			var phrases = ["you only live once", "post hoc ergo propter hoc", "little boy blue", "vini vidi vici", "lo how a rose eer blooming",
			"where the wild things are", "quod erat demonstrandum", "happy birthday", "to be or not to be", "How you like them apples"];
			var randomNum = Math.floor(Math.random() * phrases.length);
			var phrase = phrases[randomNum];
			View.render(phrase);
			Model.thePhrase = phrase;
		},
		thePhrase: "",

		alphaClick: function() {
			var alphabet = document.getElementsByClassName("alphabet");
			for (var i = 0; i < alphabet.length; i++) {
				alphabet[i].onclick = Model.newReceiveLet;
			}
		},
		newReceiveLet: function(eventObj) {
			var letterClicked = eventObj.target;
			var letter = letterClicked.id;
			Model.checkLetter(letter); 
		},
//gets phrase either random or from input, gets letter, checks if letter is in phrase, if yes then displays letter, if no then draws body part
		checkLetter: function(letter) { //phrase comes from either randomPhrase of getPhraseFromInput.
			var phrase = Model.thePhrase;
			var aTD = document.getElementsByClassName(letter);  //this is an array object i think of tds with the classname of theLet
			var result = this.testIfLetterInWord(letter, phrase);
				if (result) {
					for (var i = 0; i < aTD.length; i++) {
						aTD[i].innerHTML = letter;  //this sets the innerhtml of each td to theLet which reveals the letter.
						}
				} else {
					this.counterDraw();
				}
			document.getElementById(letter).style.visibility = "hidden"; //hides tds when clicked
		},
		testIfLetterInWord: function(letter, phrase) {
				var matcher = new RegExp(letter);
				return (matcher.test(phrase))  //true or false
			},
		
		count: 0,
		counterDraw: function() {
				if  (this.count === 0) {
					View.drawHead();
				} else if (this.count === 1) {
					View.drawBody();
				} else if (this.count === 2) {
					View.drawLeftLeg();
				} else if (this.count === 3) {
					View.drawRightLeg();
				} else if (this.count === 4) {
					View.drawRightArm();
				} else if (this.count === 5) {
					View.drawLeftArm();
					View.displayMessage("LAST CHANCE!!")
				} else {
					View.displayMessage("Game Over");
				}
			this.count += 1
		},
		singlePlayer: function() { //when single player is tapped, go to mainpage.
			var that = this;
			var startMain = document.getElementById("singleButton").addEventListener("click", this.startMainPage);
			var rend = document.getElementById("singleButton").addEventListener("click", this.randomPhrase);
		},
		startMainPage: function() {
			View.gamePage();
			View.drawing();
			Model.alphaClick();
		},
		
}
window.onload = init;//event handler
function init() {
	View.welcomePage(); //order matters here!
	Model.singlePlayer();
	var enterButton = document.getElementById("button");
	enterButton.onkeypress = handleKeyPress;
	Model.button();
	//View.displayMessage("this is hangman");
}
//why doesn't this work?
function handleKeyPress(e) {
	var button = document.getElementById("button");
	if (e.keyCode === 13) {
		button.click();
		return false;
	}
}
//other ideas: function to make sure phrases aren't selected twice.  You win function. wrap td's. 

