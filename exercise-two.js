'use strict';

var Promise = require('bluebird');
var async = require('async');
var exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile;
var promisifiedReadFile = exerciseUtils.promisifiedReadFile;

var green = exerciseUtils.green;
var red = exerciseUtils.red;
var filenames = (function(){
	var arr = [];
	for (var i = 1; i <= 9; i++) {
		arr.push('poem-two/stanza-0' + i + '.txt');
	}
	return arr;
})();
var promisesArr = filenames.map(function(fileName){
	return promisifiedReadFile(fileName);
});


/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * A. log poem two stanza one and stanza two, in any order
 *    but log 'done' when both are done
 *
 */

// callback version
async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
	function (filename, eachDone) {
		readFile(filename, function (err, stanza) {
			console.log('-- A. callback version --');
			green(stanza);
			eachDone();
		});
	},
	function (err) {
		console.log('-- A. callback version done --');
	}
);

// promise version
// ???

var firstTwo = promisesArr.slice(0,2);
Promise.all(firstTwo)
.then(function(contents) {
	contents.forEach(function(stanza){
		red(stanza.toString());
	});
	red("DONE");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * B. log all the stanzas in poem two, in any order
 *    and log 'done' when they're all done
 *
 */

// var filenames = [1,2,3,4,5,6,7,8].map(function (n) {
// 	return 'poem-two/' + 'stanza-0' + n + '.txt';
// });

// callback version
async.each(filenames,
	function (filename, eachDone) {
		readFile(filename, function (err, stanza) {
			console.log('-- B. callback version --');
			green(stanza);
			eachDone();
		});
	},
	function (err) {
		console.log('-- B. callback version done --');
	}
);

// promise version
// ???
Promise.all(promisesArr)
.then(function(contents) {
	contents.forEach(function(stanza){
		red(stanza.toString());
	});
	red("DONE");
});




/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * C. log all the stanzas in poem two, *in order*
 *    and log 'done' when they're all done
 *
 */

// callback version
async.eachSeries(filenames,
	function (filename, eachDone) {
		readFile(filename, function (err, stanza) {
			console.log('-- C. callback version --');
			green(stanza);
			eachDone();
		});
	},
	function (err) {
		console.log('-- C. callback version done --');
	}
);

// promise version
// ???
Promise.all(promisesArr)
.then(function(contents) {
	contents.forEach(function(stanza){
		red(stanza.toString());
	});
	red("DONE");
});
/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * D. log all the stanzas in poem two, *in order*
 *    making sure to fail for any error and log it out
 *    and log 'done' when they're all done
 *
 */

var randIdx = Math.floor(Math.random() * filenames.length);
filenames[randIdx] = 'wrong-file-name.txt';

// callback version
async.eachSeries(filenames,
	function (filename, eachDone) {
		readFile(filename, function (err, stanza) {
			console.log('-- D. callback version --');
			if (err) return eachDone(err);
			green(stanza);
			eachDone();
		});
	},
	function (err) {
		if (err) red(err);
		console.log('-- D. callback version done --');
	}
);

// promise version
// ???
Promise.all(promisesArr)
.then(function(contents) {
	contents.forEach(function(stanza){
		red(stanza.toString());
	});
})
.then(null, function(err){
	red("WRONG!" + err);
})
.then(function(){
	red("done!!!!!!!!");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * E. make a promisifed version of fs.writeFile
 *
 */

var fs = require('fs');
function promisifiedWriteFile (filename, str) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(filename, str);
		resolve();
	});
}

promisifiedWriteFile('poem-two/stanza-09.txt', "HEY ROWAR!!!")
.then(function(contents){
	red("DOUBLE DOooooooooooooo o o                                                    ONE");
});