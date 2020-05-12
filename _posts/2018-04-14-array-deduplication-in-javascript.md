---
layout: default
title: Array Deduplication in JavaScript
date: April 14, 2018
tags: JavaScript
categories: JavaScript
---
Removing duplicates from array in JavaScript is a common question, and many libraries has implemented a unqiue method to do this kinda job. But we might not need a library to do this because remove duplicates from array is not so hard a thing. In this post, you'll learn some elegant methods to remove duplicates in array.

## Using ES6 Set
ES6 Set is born for store unique values. Using Set to removing duplicates is very simple and elegant.

```js
const arr = [1, 1, '1', '1'];
const uniq = [...new Set(arr)]; // [1, '1']

// or
const uniq = Array.from[new Set(arr)]; // [1, '1']
```

ES6 build-in [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is actually an iterable object, so we can use spread operator to spread it out and collect it in array. It works fine on primitives and objects(object, array, function, ...etc), but this doesn't works:

```js
// Because object is referenced by identifier, this doesn't works:
const arr = [{}, {}, [], []];
const uniq = [...new Set(arr)]; // [{}, {}, [], []]

// This works:
const obj = {};
const fn = () => {};
const arr = [obj, obj, fn, fn];
const uniq = [...new Set(arr)]; // [obj, fn]
```

## Using ES5 Array methods

```js
var arr = [1, 1, '1', '1'];

function unique (arr) {
  // indexof only returns the first index of duplicates, meaning only the last item in duplicates will remains after filtering.
  return arr.filter((item, index, array) => {
    return array.indexof(item) !== index;
  })
}

var uniq = unique(arr); // [1, '1']
```

This method works the same as the method I mentioned above, but look at this:

```js
var arr = [1, 1, NaN, NaN];

// Whoops!
var uniq = unique(arr); // [1, NaN, NaN]
```

Why this happens? Actually nothing wrong about this version of `unique` function, the problem is `NaN`. Under the hood, `indexof` use === for comparison, and `NaN` is not equal to `NaN`, so `indexof` fails to handle such case. (ES6 Set consider `NaN` is the same as `NaN`, even though `NaN` !== `NaN`.)

## Sort and Deduplicate
Let's imagine we already have an sorted array, what we need to do is to loop through the array and compare current value with previous value:

```js
var sortedArr = [1, 1, '1', '1', NaN, NaN];

function unique(sortedArr) {
  var before, ret = [];
  var i = 0, len = sortedArr.length;
  for (; i < len; i++) {
    // first item in sortedArray has nothing to compare, so push it to ret directly.
    if (!i || before !== sortedArr[i]) {
      ret.push(sortedArr[i]);
    }
    before = sortedArr[i];
  }
  return ret;
}

var uniq = unique(sortedArr); // [1, "1", NaN, NaN]

// Warning: aviod using array.sort() for sorting in moseca, it's not stable;
var array = [1, '1', 1, '1', {}, NaN, {}, NaN];

array.slice().sort(); // [1, "1", 1, "1", NaN, NaN, {…}, {…}];
```

## Ultimate: Using Object
The most powerful ways to removing duplicates is using object, as key in object are unique. But remember keys in object must be string, so we need to handle case like `[1, '1']`. In addition, what if we wanna remove duplicates of object, not matter they have the same reference or not?

```js
// The key point is to generate unique string keys.
typeof 1 // "number"
typeof '1' // "string"
typeof {value: 1} // "object"
typeof 1 + 1 // "number1"
typeof '1' + '1' // "string1"
typeof {value: 1} + {value: 1} // "object[object Object]"
typeof 1 + JSON.stringify(1) // "number1"
typeof '1' + JSON.stringify("1") // "string1"
typeof {value: 1} + JSON.stringify({value: 1}) // "object{value: 1}"

// now you got the key:
typeof item + JSON.stringify(item)

var arr = [1, 1, '1', '1', {value: 1}, {value: 1}, {value: 2}, NaN, NaN, [1], [1], [2]];

// ultimate solution:
function unique(arr) {
  var obj = {};
  return arr.filter(function(item, index, array){
    // generate unique key.
    var uniqKey = typeof item + JSON.stringify(item);
    // if already in obj, return false to filter it.
    if (obj.hasOwnProperty(uniqKey)) return false;
    // if not, push it into arr.
    return obj[typeof item + JSON.stringify(item)] = true;
  });
}

unique(arr); // [1, "1", {value: 1}, {value: 2}, NaN, [1], [2]]
```