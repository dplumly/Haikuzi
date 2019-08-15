global.XAXIS = 0;
global.YAXIS = 1;
global.ZAXIS = 2;

var ADXL345 = require('./index.js');

// play sound player
const player = require('play-sound')(); 

// script startup sound
player.play('/home/pi/ADXL345/introScriptSound.mp3')

var globalvar = {
	SAMPLECOUNT : 400,
	accelScaleFactor : [0.0, 0.0, 0.0],
	runTimeAccelBias : [0, 0, 0],
	accelOneG : 0.0,
	meterPerSecSec : [0.0, 0.0, 0.0],
	accelSample : [0, 0, 0],
	accelSampleCount : 0
}

var accel = new ADXL345(function(err) {
	accel.accelScaleFactor[XAXIS] = 0.0371299982;
	accel.accelScaleFactor[YAXIS] = -0.0374319982;
	accel.accelScaleFactor[ZAXIS] = -0.0385979986;
	if (!err) {
		computeAccelBias();
	} else {
		console.log(err);
	}
})
function computeAccelBias() {
	accel.computeAccelBias(function() {
		measureAccel();
	});
}

// main function
function measureAccel() {
	setInterval(function() {
		accel.measureAccel(function(err) {
			if (!err) { 
				if (accel.meterPerSecSec[global.XAXIS] <= -5 || accel.meterPerSecSec[global.XAXIS] >= 5) {
					console.log("Playing Roll Audio");
					debouncedSound();
				}  
                               if (accel.meterPerSecSec[global.YAXIS] <= -5 || accel.meterPerSecSec[global.YAXIS] >= 5) {
					console.log("Playing Pitch Audio");
					debouncedSound();
				} 
			console.log("Roll: " + accel.meterPerSecSec[global.XAXIS] + " Pitch : " + accel.meterPerSecSec[global.YAXIS]);

			} else {
				console.log(err);
			}
		});
	}, 1000);
}


var debouncedSound = debounce(getRandomSounds, 1050, true);

// randomizing audio files
function getRandomSounds() {
	var randomNum = Math.floor(Math.random()*sounds.length);
	player.play(sounds[randomNum]);
	console.log(randomNum);
}

// debounce
function debounce(func, wait, immediate) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};


/*
function getRandomSounds() {
	var randomNum = Math.floor(Math.random()*sounds.length);
	player.play(sounds[randomNum]);
	console.log(randomNum);
}

var getRandomSounds = debounce(function() {
	var randomNum = Math.floor(Math.random()*sounds.length);
	player.play(sounds[randomNum]);
	console.log(randomNum);
}, 2000);
*/

//setInterval(function() {
		//var randomNum = Math.floor(Math.random()*sounds.length);
		//player.play(sounds[randomNum]);
		//console.log(randomNum);
	//}, 5000);


// Sound Files
var basepath = '/home/pi/ADXL345/haikus/'
var sounds = [
	'haiku1.mp3',
	'haiku2.mp3',
	'haiku3.mp3',
	'haiku4.mp3',
	'haiku5.mp3',
	'haiku6.mp3',
	'haiku7.mp3',
	'haiku8.mp3',
	'haiku9.mp3',
	'haiku10.mp3',
	'haiku11.mp3',
	'haiku12.mp3',
	'haiku13.mp3',
	'haiku14.mp3',
	'haiku15.mp3',
	'haiku16.mp3',
	'haiku17.mp3',
	'haiku18.mp3',
	'haiku19.mp3',
	'haiku20.mp3',
	'haiku21.mp3',
	'haiku22.mp3',
	'haiku23.mp3',
	'haiku24.mp3',
	'haiku25.mp3',
	'haiku26.mp3',
	'haiku27.mp3',
	'haiku28.mp3',
	'haiku29.mp3',
	'haiku30.mp3',
	'haiku31.mp3',
	'haiku32.mp3',
	'haiku33.mp3',
	'haiku34.mp3',
	'haiku35.mp3',
	'haiku36.mp3',
	'haiku37.mp3',
	'haiku38.mp3',
	'haiku39.mp3',
	'haiku40.mp3',
	'haiku41.mp3',
	'haiku42.mp3',
	'haiku43.mp3',
	'haiku44.mp3',
	'haiku45.mp3',
	'haiku46.mp3',
	'haiku47.mp3',
	'haiku48.mp3',
	'haiku49.mp3',
	'haiku50.mp3'
]
