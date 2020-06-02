---
layout: default
title: Notes on Technical Writing
date: June 02, 2020
tags: Writing Notes
categories: Writing
---

This article records some notes I had written while engaging in [Google Technical Writing Courses](https://developers.google.com/tech-writing/). Most of the topics I listed below are the critical basics of technical writing.

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

For example, either of the following sentences disambiguate the previous example:

> Overlapping functionality is not optimal.

> This overlapping functionality is not optimal.


## Active voice vs. passive voice

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

You can sometimes repair a There is or There are sentence by moving the true subject and true verb from the end of the sentence to the beginning. For example:

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
