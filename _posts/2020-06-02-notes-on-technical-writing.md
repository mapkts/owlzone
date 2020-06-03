---
layout: default
title: Notes on Technical Writing
date: June 02, 2020
tags: Writing Notes
categories: Writing
---

This article records some notes I had written while engaging in [Google Technical Writing Courses](https://developers.google.com/tech-writing/). The google technical writing courses do an excellent job in giving a detailed list of things we should consider while writing technical materials. Most of the topics I listed below are the critical basics of technical writing.

{% include toc.html %}


## Words

Words are the fundamental parts of a sentence. In technical writing, it's important to use words in a manner that your audiences can understand properly.

### Define new or unfamiliar terms

When you spot a term that might be unfamiliar to some of your audiences, take one of the following two tactics:

* If the term already exists somewhere else, link to a good existing explanation.
* If your document is introducing the term, define the term. If your document is introducing many terms, collect the definitions into a glossary.

### Use terms consistently

When introducing a long-winded concept name or product name, it is common to specify a shorthand version of that name (in other words, acronym). If you decide to use a acronym for that name, you should:

* Spell out the full term on the initial use, and put the acronym in parentheses.
* Bold both the spelled-out version and the acronym.
* Use that acronym throughout the document afterwards. Don't cycle back and forth between the acronym and the expanded version.

Here's a proper example:

> If no cache entry exists, the Mixer calls the **OttoGroup Server** (**OGS**) to fetch Ottos for the request. The OGS is a repository that holds all servable Ottos. The OGS is organized in a logical tree structure, with a root node and two levels of leaf nodes. The OGS root forwards the request to the leaves and collects the responses.

### Use the acronym or the full name?

Acronyms do reduce sentence size. But acronym is just a layer of abstraction; readers must mentally expand recently learned acronyms to the full term. It takes a number of occurrences for readers to generally stop expanding acronyms into the full term.

Here are the guidelines for acronyms:

* Don't define acronyms that would only be used a few times.
* Do define acronyms that meet both of the following criteria:
  * The acronym is significantly shorter than the full term.
  * The acronym appears many times in the document.

### Disambiguate pronouns

Many pronouns point to a previously introduced noun. Like using pointer heavily in programming tend to introduce errors, the utility of a pronoun sometimes outweighs its risk. In many cases you should simply avoid the pronoun and just reuse the noun.

Consider the following pronoun guidelines:

* Only use a pronoun after you've introduced the noun.
* Place the pronoun as close as possible to the referring noun. In general, if more than five words separate your noun from your pronoun, consider repeating the noun instead of using the pronoun.
* If you introduce a second noun between your noun and your pronoun, reuse your noun instead of using a pronoun.

Pronouns like **it**, **they**, **them** and **their** cause the most confusion in technical documentation. For example:

> Python is interpreted, while C++ is compiled. **It** has an almost cult-like following. (Does it refer to python or C++)

> You may use either Frambus or Foo to calculate derivatives. **This** is not optimal. (Does this refer to Frambus, to Foo, or to both)

Use either of the following tactics to disambiguate **this** and **that**:

* Replace **this** or **that** with the appropriate noun.
* Place a noun immediately after this or that.

For example, either of the following sentences disambiguate the previous example:

> Overlapping functionality is not optimal.

> This overlapping functionality is not optimal.


## Active voice

Be bold: use the active voice most of the time. Active voice provides the following advantages:

* Most readers mentally convert passive voice to active voice. Why subject your readers to extra processing time?
* Passive voice obfuscates your ideas and reports action indirectly.
* Some passive voice sentences omit an actor altogether, which forces the reader to guess the actor's identity.
* Active voice is generally shorter than passive voice.


## Clear sentences

Comedy writers seek the funniest, horror writers strive for the scariest, and technical writers aim for the clearest. In technical writing, clarity takes precedence over all other rules. This unit suggests a few ways to make your sentences beautifully clear.

### Choose strong verbs

To engage and educate readers, choose precise, strong, specific verbs. Reduce imprecise, weak, or generic verbs, such as the following:

* forms of be: is, are, am, was, were, etc.
* occur
* happen

Consider how strengthening the weak verb in the following sentences ignites a more engaging sentence:

| Weak Verb                                         | Strong Verb                                     |
| ---                                               | ---                                             |
| The error occurs when clicking the submit button. | Clicking the submit button triggers the error.  |
| This error message happens when...                | The system generates this error message when... |
| We are very careful to ensure...                  | We carefully ensure...                          |

### Reduce there is/there are

In the best case scenario, you may simply **There is** or **There are** (and possibly another word or two later in the sentence). For example, consider the following sentence:

> There is a variable called **met_trick** that stores the current accuracy.

Removing There is replaces the generic subject with a better subject. For example:

> A variable named **met_trick** stores the current accuracy.

Or

> The **met_trick** variable stores the current accuracy.

You can sometimes repair a **There is** or **There are** sentence by moving the true subject and true verb from the end of the sentence to the beginning. For example:

> There are two disturbing facts about Perl you should know.

Replacing **There are** with **you** strengthens the sentence:

> You should know two disturbing facts about Perl.

If no subject exists, consider creating one. For example:

> There is no guarantee that the updates will be received in sequential order.

Replacing **There is** with a meaningful subject (such as clients) creates a clearer experience for the reader:

> Clients might not receive the updates in sequential order.

### Minimize certain adjectives and adverbs

Adjectives and adverbs can make technical documentation sound dangerously like marketing material. For example:

> Setting this flag makes the application run screamingly fast.

Granted, **screamingly fast** gets readers attention but not necessarily in a good way. Feed your technical readers factual data instead of marketing speak. For example:

> Setting this flag makes the application run 225-250% faster.

Don't confuse educating your readers (technical writing) with publicizing or selling a product (marketing writing). When your readers expect education, provide education; don't intersperse publicity or sales material inside educational material.


## Lists and tables

Technical readers generally love lists. Therefore, when writing, seek opportunities to convert prose into lists.

In general, there are three types of lists: bulleted, numbered and embedded. If ordering is not important to list's meaning, use a bulleted list. Otherwise, use a numbered list. Avoid embedded lists in most cases because they are a poor way to present technical information.

### Keep list items parallel

All items in a parallel list look like they "belong" together. That is, all items in a parallel list match along the following parameters:

* grammar
* logical category
* capitalization
* punctuation

The following list is painfully nonparallel along all four parameters:

* carrots
* potatoes
* The summer light obscures all memories of winter.

By contrast, the following list is parallel:

* Carrots contain lots of Vitamin A.
* Potatoes taste delicious.
* Cabbages provide oodles of Vitamin K.

### Start numbered list items with imperative verbs

Consider starting all items in a numbered list with an imperative verb. For example, notice how all of the items in the following parallel numbered list begin with an imperative verb:

* Download the Frambus app from Google Play or iTunes.
* Configure the Frambus app's settings.
* Start the Frambus app.

### Punctuate items appropriately

If the list item is a sentence, use sentence capitalization and punctuation. Otherwise, do not use sentence capitalization and punctuation.

### Create useful tables

Consider the following guidelines when creating tables:

* Label each column with a meaningful header.
* Avoid putting too much text into a table cell.
* Strive for parallelism within individual columns.

### Introduce each list and table

We recommend giving the list or table a introductory sentence. For example, consider the following introductory sentences:

* The following list identifies key performance parameters:
* Take the following steps to install the Frambus package:
* The following table summarizes our product's features against our key competitors' features:


## Paragraphs

This section provides some guidelines on building cohesive paragraphs.But first, here is an inspirational message:

> The work of writing is simply this: untangling the dependencies among the parts of a topic, and presenting those parts in a logical stream that enables the reader to understand you.

### Write a great opening sentence

Good opening sentences establish the paragraph's central point. For example, the following paragraph features an effective opening sentence:

> A loop runs the same block of code multiple times. For example, suppose you wrote a block of code that detected whether an input line ended with a period. To evaluate a million input lines, create a loop that runs a million times.

However, the following opening sentence leads readers to the wrong direction.

> A block of code is any set of contiguous code within the same function. For example, suppose you wrote a block of code that detected whether an input line ended with a period. To evaluate a million input lines, create a loop that runs a million times.

Note that effective opening sentences can take many forms. That is, not all great paragraphs start with a sentence that states the theme. Starting a paragraph with a rhetorical question, for example, can engage readers.

### Focus each paragraph on a single topic

A paragraph should represent an independent unit of logic. Restrict each paragraph to the current topic. Don't describe what will happen in a future topic or what happened in a past topic. When revising, ruthlessly delete (or move to another paragraph) any sentence that doesn't directly relate to the current topic.

For example, assume that the opening sentence does establish the desired theme for the paragraph:

> Spreadsheets provide a great way to organize data. Think of a spreadsheet as a table with rows and columns. **Spreadsheets also provide mathematical functions, such as means and standard deviations.** Each row holds details about one entity. Each column holds details about a particular parameter. For example, you can create a spreadsheet to organize data about different trees. Each row would represent a different type of tree. Each column would represent a different characteristic, such as the tree's height or the tree's spread.

The bold sentence distracts from that theme.

### Don't make paragraphs too long or too short

Long paragraphs are visually intimidating. Readers generally welcome paragraphs containing three to five sentences, but will avoid paragraphs containing more than about seven sentences.

Conversely, don't make paragraphs too short. If your document contains plenty of one-sentence paragraphs, your organization is faulty.

### Answer what, why, and how

Good paragraphs answer the following three questions:

* What are you trying to tell your reader?
* Why is it important for the reader to know this?
* How should the reader use this knowledge. Alternatively, how should the reader know your point to be true?

For example, the following paragraph answers what, why, and how:


> `<Start of What>`The garp() function returns the delta between a dataset's mean and median.`<End of What>` `<Start of Why>`Many people believe unquestioningly that a mean always holds the truth. However, a mean is easily influenced by a few very large or very small data points.`<End of Why>` `<Start of How>`Call garp() to help determine whether a few very large or very small data points are influencing the mean too much. A relatively small garp() value suggests that the mean is more meaningful than when the garp() value is relatively high.`<End of How>`

## Documents

This section describes how can we organize sentences and paragraphs into a coherent document.

### State your document's scope

A good document begins by defining its scope and its non-scope. For example:

> This document describes the overall design of Project Frambus.

> This document does not describe the design for the related technology, Project Froobus.

These scope and non-scope statements benefit not only the reader but also the writer (you). While writing, if the contents of your document veer away from the scope statement, then you must either refocus your document or modify your scope statement.

### State your audience

A good document explicitly specifies its audience. For example:

> I wrote this document for the test engineers supporting Project Frambus.

Beyond the audience's role, a good audience declaration might also specify any prerequisite knowledge or experience. For example:

> This document assumes that you understand matrix multiplication and how to brew a really good cup of tea.

In some cases, the audience declaration must also specify prerequisite documents. For example:

> You must read "Project Froobus: A New Hope" prior to reading this document.

### Establish your key points up front

Busy people won't necessarily read all of your document. When reviewing your documentation, ensure that the start of your document answers your readers' essential questions.

Also, always write an executive summary (a TL;DR) for long engineering documents.


## Punctuation

This section discusses proper usages of punctuation marks. TL;DR:

* Insert a comma wherever a reader would naturally pause somewhere within a sentence.
* Use a period rather than a comma to separate two independent thoughts.
* Use a semicolon rather than a period to unite highly related thoughts. Note that the thoughts preceding and following the semicolon must each be grammatically complete.
* Use em-dash to represent a longer pause than a comma. Be aware em-dashes are compelling punctuation marks, rich with possibilities.
* Use parentheses to hold minor points and digressions. Parentheses inform readers that the enclosed text isn't critical.

The rules regarding periods and parentheses have tripped up many a writer. Here are the standards:

* If a pair of parentheses holds an entire sentence, the period goes inside the closing parenthesis.
* If a pair of parentheses ends a sentence but does not hold the entire sentence, the period goes just outside the closing parenthesis.


## Additional resources

1. [University of Oxford Style Guide](https://www.ox.ac.uk/sites/files/oxford/media_wysiwyg/University%20of%20Oxford%20Style%20Guide.pdf) (for general writing)
2. [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/) (for anyone writing technical documentation)
3. [Google developer documentation style guide](https://developers.google.com/style) (for anyone writing developer documentation for Google-related projects)
