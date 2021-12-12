# freeCodeCamp Random Quote Machine

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

For example, I first build everything static to ensure I pass the structure tests. And this is the lovely part of TDD, they've defined the tests for me. I just build until I pass.

## STRUCTURE:

- wrapper element with id: `quote-box` (US 1)
- child content element with id: `text` (US 2)
- child content element with id: `author` (US 3)
- child clickable element with id: `new-quote` (US 4)
- child clickable "a" element with id: `tweet-quote` (US 5)

## BEHAVIOR:

**On load:**

- first quote is displayed in `#text` (US 6)
- quote's author is displayed in `#author` (US 7)
- `#quote-box` is horizontally centered (US 11)
  **On `#new-quote` click:**
- new quote is displayed in `#text` (US 8)
- new author is displayed in `#author` (US 9)
- **On `#tweet-quote click`**
  - link is: a href = "https://twitter.com/intent/tweet" + quote (see docs) (US 10)
  - Twitter does not like iframes, so have click target \_blank or \_top

## The plan

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/RwLGMqm). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

This didn't work as expected. I actually passed 3.

There are 12 tests in three groups. 

- First (Stack) is simply having a tech stack. PASSED
- Second (Content) is user stories (US) 1-10. PASSED 6 & 7 (why?)
- Third (Layout) is user story 11. FAILED

### 2: Pass US 1, US 11

Good project because it sets up most of the scaffolding to support the others.

### 3: Pass US 2 & 3 (and also 6 & 7)

Interestingly enough, not only creating the elements, but filling them with a dummy (static) quote technically satisfied 6 & 7 too, though the random quote selector (and a selection of quotes) still needs to be implemented.

### 4: Pass US 4 & 5

These are set up just as structure. Functionality comes with 8, 9, and 10. Created a row component, then the next button and tweet link components are child components of it. I'm pretty sure I have some .

### 5: Randomize Quote Selection

This adds a list of quotes, the function for selecting a random one, and a bit of logic for selecting a random quote on load. Luckily I keep some quote lists in my files. Grabbed a few, JSONned them up, and put them in the `quotes` constant.

### 6: Wire up randomizer to button (US 8 & 9) 

At this point 11 of 12 tests are passed.  All that's left is to wire up the tweet link.

### 7: Wire up the Tweet Button

This came with a bunch of misfires getting the link to render right and then for Twitter to accept it. If my target was other than "_top", Twitter would refuse the connection. 

Then, when I tried to use their widget (add a JS script to the page and a class to the link to render a "tweet" button) to make it look nicer, the button would clobber my target, open a new tab, and the link would get the same refusal to connect.

As that's not a requirement for the tests to pass, I decided to leave making a fancy button out of the project.