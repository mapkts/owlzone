---
layout: default
title: A Thought On Shortening Function Calls
date: May 23, 2020
tags: JavaScript
categories: JavaScript
---

I recently come up with some crazy but funny ideas regarding shortening function calls when I was refactoring JavaScript code that empowers this website. While these ideas will probably never have the chance to land in real-world production code, a little bit of exploration is still worth taking.

## Typical Approach
The typical approach of shortening function calls is through method chaining and shorthand function names, but these two approaches have some significant defects. Concerning method chaining, only those functions that produce all sorts of side effects can return namespace object at the end of the function body to make them chainable. There
is no way to chain a function that produces real data with the other one. For shorthand function names, it may never be a sound choice to sacrifice understandability in order to type less. In fact, when you want to shorten the function name, you will be more inclined to overload the function (BUT THERE IS NO OVERLOADING IN JAVASCRIPT!), which inevitably increases the complexity.

## Functional Approach
When it comes to the fantasy land of functional programming in JavaScript, with [currying](https://en.wikipedia.org/wiki/Currying) and function composition in our toolbox, we can build a function pipeline that pipes the original data through a list of curried function and returns the final result, no matter they are void or not. Let's make a quick example to explain:

```js
// Let's imagine we have a library that use $ as namespace and acts like
// jQuery, but promotes functional approach to manipulate DOM. Now we want
// to do something with all the `li`s in our page.

// First build our function pipeline, everything is chainable.
const doSomething = $.pipe(
  $.filter(x => $.hasClass("bg-redable", x)), // Only retains `li`s that has class `bg-redable`
  $.addClass("bg-red"),                       // Adds class `bg-red` to them all
  $.css({"background": "red"}),               // And applies css to them all
);

// Then actually do something with selected `li`s.
doSomething($("li"));
```

This approach is pretty handy as you can operate on native node element or nodeList without initializing a jQuery-like wrapper object to hold the actually selected ones. And what fascinates me is, can we step further, like omitting the dollar sign `$`s inside the function pipeline?

## Evil but Yes
It's turns out we can avoid the pervasive `$`(or any namespace variable) by temporarily polluting the global window
in a very short lifetime. Here's my approach:

```js
// 1st: defines a core method list.
const core_methods = {
  addClass,
  removeClass,
  toggleClass,
  attr,
  css,
  empty,
  filter,
  on,
  off,
  // ...
};

// 2nd: defines our almighty `sync` and `unsync`.
// Assumes the namespace symbol is `$`.
const globals = Object.create(null);
$.sync = function () {
  // temporarily exports the core methods to the global.
  core_methods.forEach(method => {
    if ( window.hasOwnProperty(method) ) {
      globals[method] = window[method];
    }
    window[method] = $[method];
  });

  // returns self because we need to chain with `pipe`.
  return $.sync;
};

$.unsync = function () {
  // Makes everything back to their origins.
  core_methods.foreach(method => {
    if ( globals.hasownproperty(method) ) {
      window[method] = globals[method];
    } else {
      delete window[method];
    }
  });

  return $;
}

// 3rd: defines a special version of `pipe` that automatically
// calls `unsync` when pipeline was built successfully.
$.sync.pipe = function () {
  const fs = Array.prototype.slice.call(arguments, 1);
    const pipe = function () {
      return fs.reduce(function (a, c) {
        return c(a);
      }, f.apply(null, arguments));
    };

    $.unsync();

    return pipe;
};


// And now, you are capable of doing something crazy.
$.sync().pipe(
  filter(x => $.hasClass("bg-redable", x)),
  addClass("bg-red"),
  css({"background": "red"}),
);

console.log(window.addClass); // undefined
```