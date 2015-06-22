'use strict';

var Promise = require('bluebird');
var exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile;
var promisifiedReadFile = exerciseUtils.promisifiedReadFile;

var green = exerciseUtils.green;
var red = exerciseUtils.red;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * A. log poem one stanza one
 *
 */

// callback version
readFile('poem-one/stanza-01.txt', function (err, stanza) {
	console.log('-- A. callback version --');
	green(stanza);
});

// promise version
// ???

console.log("promisified versoion");
promisifiedReadFile("poem-one/stanza-01.txt")
.then(function(stanza) {
	red(stanza.toString());
});


/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * B. log poem one stanza two and three, in any order
 *
 */

// callback version
readFile('poem-one/stanza-02.txt', function (err, stanza2) {
	console.log('-- B. callback version (stanza two) --');
	green(stanza2);
});
readFile('poem-one/stanza-03.txt', function (err, stanza3) {
	console.log('-- B. callback version (stanza three) --');
	green(stanza3);
});

// promise version
// ???

promisifiedReadFile("poem-one/stanza-01.txt")
.then(function(stanza) {
	red(stanza.toString());
	return promisifiedReadFile("poem-one/stanza-02.txt");
})
.then(function(stanza2) {
	red(stanza2.toString());
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * C. log poem one stanza two and *then* stanza three
 *    log 'done' when both are done
 *
 */

// callback version
readFile('poem-one/stanza-02.txt', function (err, stanza2) {
	console.log('-- C. callback version (stanza two) --');
	green(stanza2);
	readFile('poem-one/stanza-03.txt', function (err, stanza3) {
		console.log('-- C. callback version (stanza three) --');
		green(stanza3);
		console.log('-- C. callback version done --');
	});
});

// promise version
// ???

promisifiedReadFile("poem-one/stanza-02.txt")
.then(function(stanza) {
	red(stanza.toString());
	return promisifiedReadFile("poem-one/stanza-03.txt");
})
.then(function(stanza3) {
	red(stanza3.toString());
	red("done");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * D. log poem one stanza four or an error if it occurs
 *
 */

// callback version
readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
	console.log('-- D. callback version (stanza four) --');
	if (err) red(err);
	else green(stanza4);
});

// promise version
// ???

promisifiedReadFile("poem-one/stanza-04.txt")
.then(function(stanza) {
	red(stanza.toString());
})
.then(null, function(err) {
	red(err);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * E. log poem one stanza three and *then* stanza four
 *    or log an error if it occurs for either file read
 *
 */

// callback version
readFile('poem-one/stanza-03.txt', function (err, stanza3) {
	console.log('-- E. callback version (stanza three) --');
	if (err) return red(err);
	green(stanza3);
	readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
		console.log('-- E. callback version (stanza four) --');
		if (err) return red(err);
		green(stanza4);
	});
});

// promise version
// ???

promisifiedReadFile("poem-one/stanza-03.txt")
.then(function(stanza3) {
	red(stanza3.toString());
	return(promisifiedReadFile("poem-one/stanza-04.txt"));
})
.then(function(stanza4) {
	red(stanza4.toString());
})
.then(null, function(err) {
	red(err);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * F. log poem one stanza three and *then* stanza four
 *    or log an error if it occurs for either file read
 *    always log 'done' when everything is done
 *
 */

// callback version
readFile('poem-one/stanza-03.txt', function (err, stanza3) {
	console.log('-- F. callback version (stanza three) --');
	if (err) {
		red(err);
		console.log('-- F. callback version done --');
		return;
	}
	green(stanza3);
	readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
		console.log('-- F. callback version (stanza four) --');
		if (err) red(err);
		else green(stanza4);
		console.log('-- F. callback version done --');
	});
});

// promise version
// ???

promisifiedReadFile("poem-one/stanza-03.txt")
.then(function(stanza3) {
	red(stanza3.toString());
	return(promisifiedReadFile("poem-one/stanza-04.txt"));
})
.then(function(stanza4) {
	red(stanza4.toString());
})
.then(null, function(err) {
	red(err);
})
.then(function(){
	red("DONE!");
});





