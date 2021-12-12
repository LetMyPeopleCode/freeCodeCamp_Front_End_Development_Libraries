# freeCodeCamp Drum Machine

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

## STRUCTURE:
- outer container with id="drum-machine" (US 1)
- inside `#drum-machine`, element with id="display" (US 2)
- inside `#drum-machine` 9 clickable elements, class `.drum-pad` (US 3)
  - each element corresponds to one of the following keys (Q, W, E, A, S, D, Z, X, C)

- inside each drum pad element, there should be an audio element that has a src pointing to a clip, a class name of clip, and an ID corresponding to the letter in its parent's innerText. (US 4)

## BEHAVIOR:
- Clicking a drum pad element triggers the playing of the sound (US 5)
- Pressing the key associated with a drum pad triggers it (US 6)
- When a drum pad is triggered, a string describing the sound appears in `#display` (US 7)

## THE PLAN:

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/MWEbJgY). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

Once again, I pass 1 because it just requires some sort of tech stack, but the remaining tests fail.

### 2: Pass US 1

Easy peasy, lemon squeezy.

### 3: Pass US 3, 4, 5, 6, & 7

I originally set things up to start playing the sound after the state had updated with the click/key and the component had rendered, using the `useEffect()` hook. This was because I was afraid if I started playing inside the element and the state updated, the re-render would truncate play. This delayed play wasn't directly linked to the onClick event for the button, so US 5 failed.

Failed US 4 when I put the audio element outside the button element.

### 4: Pass US 2

This ended up being last, because I encapsulated the functionality in each button component. I started with one button, then once it worked, it was pretty rapid-fire to add the other 8.

This probably wasn't the best order in which to do things, but I wanted to get one button working before I added the rest. That wasn't logical because they'd all work or they all wouldn't. Structuring with a single button wasn't beneficial in the long run, though minimally detrimental, with the main detriment being solving the user stories/tests out of order.