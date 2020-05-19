---
layout: default
title: Example Post
date: February 24, 2018
categories: Miscellaneous
tags: Miscellaneous
---

# Heading h1

## Heading h2

### Heading h3

#### Heading h4

##### Heading h5

###### Heading h6

Here's a paragraph:

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.

I'm *emphasized*.

I'm **bold**.

I'm a `inline code`.

Here's a list:

* List item 1
* List item 2
* List item 3

Here's a link:

Click [here](https://mapkts.com) to jump to homepage.

Here's an image:

![Owl and Rat](/assets/img/owl-and-rat.jpg)

Here's a quote:

> Don't never let somebody tell you you can't do something.

Here's a code block:

```js
// A function that allows the given function to only be called once.
function once(fn) {
  return function () {
    const f = fn;
    fn = null;
    return f.apply(this, arguments);
  };
}
```
