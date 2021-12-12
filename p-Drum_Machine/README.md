# freeCodeCamp Drum Machine

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

## STRUCTURE:
  - 
  - 

## BEHAVIOR:
- **On-Load**
  - 
    
- 

## THE PLAN:

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/MWEbJgY). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

Once again, I pass 1 because it just requires some sort of tech stack, but the remaining tests fail.

### 2: Pass US 1 & 2

Easy peasy, lemon squeezy.

### 3: Pass US 3 & 5

To make it easy to pass state between components, I created a hook with React.useState(), then passed the setter and/or value to the child components. Then we made the default text.

5 was tough. The test checks the rendered markdown, not the raw markdown, which makes the test description misleading.  

### 4: US 4 & 6

Add the wiring to render the markdown as HTML in the preview component.

This SEEMED easy until running the tests and US 5 still wouldn't pass. After ~90 minutes of wasted time, I tracked it to the test being brittle and reliant on a specific version of the markdown library, which they didn't mention. Solved.

### 5: US 7

After all the time wasted on having too new a version of marked.js, I decided there wasn't time for this.

 