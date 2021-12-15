# freeCodeCamp 25 + 5 Clock

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

## STRUCTURE:
  - Element with ID "break-label" that contains a string (e.g. "Break length"). (US 1)

  - Element `id="session-label"` that contains a string (e.g. "Session Length").  (US 2)

  - Two clickable elements with corresponding IDs: `id="break-decrement"` and `id="session-decrement"`.  (US 3)

  - Two clickable elements with corresponding IDs: `id="break-increment"` and `id="session-increment"`. (US 4)

  - Element with a corresponding `id="break-length"`, which by default (on load) displays a value of 5.  (US 5)

  - Element with a corresponding `id="session-length"`, which by default displays a value of 25. (US 6)

  - Element with a corresponding `id="timer-label"`, that contains a string indicating a session is initialized (e.g. "Session"). (US 7) 

  - Element with corresponding `id="time-left"`. NOTE: Paused or running, the value in this field should always be displayed in `mm:ss` format (i.e. 25:00). (US 8)  

  - Clickable element with a corresponding `id="start_stop"`. (US 9) 

  - Clickable element with a corresponding `id="reset"`. (US 10)

  - Audio tag with "beep" id (US 26)

  - `beep` source sound must be > 1 second (US 27)

    

## BEHAVIOR:
- Clicking reset puts time-left, break-length, and session length back to defaults. (US 11)
- break-decrement decreases break-length by one minute. (US 12)
- break-increment increases break length by one minute (US 13)
- session-decrement decreases session-length by 1 (US 14)
- session-increment increases session-length by 1 (US 15)
- cannot set session or break length to a negative number (US 16)
- cannot set session or break longer than 60 mins (US 17)
- Clicking start_stop starts timer running from value set in the clock. (US 18)
- timer should tick down 1 second at a time in mm:ss format (when running) (US 19)
- Clicking start_stop pauses a running timer (US 20)
- Clicking start_stop on a running timer starts it from time displayed (US 21)
- When session countdown hits 00:00, break countdown begins (US 23)
  - timer-label should show text indicating the switch (US 22)

- When break countdown hits 00:00, session countdown begins (US 25)
  - timer-label should show text indicating the switch (US 24)
- When a timer reaches 00:00 it should trigger the audio in `beep` (US 26)
- `beep` must stop playing when `reset` is clicked (US 28)



## MISSING SPECS

- Does the beep loop continuously until reset?
  - If so, does reset JUST stop the beep or does it stop everything? IE if you click it to stop the beep after a 25 minute session, does the break timer stop or keep going?
  - Should there be a disabled "end alarm" button that enables while sound is looping. Reset stops and rewinds everything, but "end alarm" just ends the alarm, allowing timers to continue?
  - **I chose to simply let it play, as per spec. Stopping/resetting the clock are the only ways to stop play.**
- If you set custom times, why would "reset" clobber them back to defaults? 
  - reset button returns paused or running clocks stops and returns to set values (and resets any beeps)
  - reset button if clocks are not running and are at "set" values sets to defaults
  - **While I'd have preferred a separate reset button, I decided to follow spec as there was some logic in it, even if not my preferred logic.**

## THE NOTES

- Audio elements with "loop" specified loop continuously, no loop count. For a loop count, subscribe to onended and implement own counter. 
- Audio element "rewind" method is load(), no explicit stop() but pause(). Both can generate a non-fatal exception if the asset has not completed loading. Came up in tests, but not in any live use and is invisible to the customer.



## THE PLAN:

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/NWadwdo). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

Easy as pie. Failed 28 of 29 (#1 is having a tech stack)

### 2: Structure tests (US 1-10 + 26-27)

Not worth passing these one at a time as much of the structure will be built together. This is the time where we decompose the design into components with no functionality. Passed.

### 3: Functional tests (US 11-28)

Passed all but 23-28, all of which failed with an error that the timer had not reached 00:00, though all real-world UAT showed these tests passed, something in the test structure was off. Research showed multiple highly active threads discussing the error over the past 3 years. This seemed to indicate another area of brittle tests. Since I could not argue the tests needed change, but the submission process didn't require passing them, I chose to let these slide rather than spend hours trying to develop a workaround.

## Final thought

Of the 5 projects, I felt most hobbled by CodePen on this one. Breaking up your code into multiple files is difficult enough on CodePen that it did not feel like the benefit would outweigh the effort, but if this was a real-world project, I'd have done so. If this was a quick proof-of-concept in a CodePen, I'd refactor on the next iteration when it was moved out of CodePen.
