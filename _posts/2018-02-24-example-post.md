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

Here's a link:

Click [here](https://mapkts.com) to jump to homepage.

Here's an image:

![Owl and Rat](/assets/img/owl-and-rat.jpg)

Here's an ordered list:

1. list item 1
2. list item 2
3. list item 3

Here's an unordered list:

* list item 1
* list item 2
* list item 3

Here's a nested list:

1. list item 1
  1. lorem ipsum
  2. dolor sit amet
  3. consetetur sadipscing
2. list item 2
  * lorem ipsum
  * dolor sit amet
  * consetetur sadipscing
3. list item 3

Here's a table:

| Header 1 | Header 2 | Header 3 |
| --- | --- | --- |
| lorem | ipsum | dolor |
| sit | amet | consetetur |

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
