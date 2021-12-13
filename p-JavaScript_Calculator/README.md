# freeCodeCamp JavaScript Calculator

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

## STRUCTURE:
  - Equal sign element with id: equals (US 1)

  - 10 number elements (0-9) with the number's spelled name as the ID (US 2)

  - Operations elements (add, subtract, multiply, divide) with spelled name as ID (US 3)

  - Decimal point element with ID of "decimal" (US 4)

  - "clear" element with ID of "clear" (US 5)

  - "display" element to show the current input or result (US 6)

    

## BEHAVIOR:
- Pressing clear button clears input and output values, resets display to "0" (US 7)

- As I input numbers they should show in "display" (US 8)

- In Any order I should be able to add, subtract, multiply a chain of numbers of any length and have the correct calculation shown in "display" when I hit "=" - this is formula logic, so it displays and calculates the entered formula, not a new result as each operator is chosen. (US 9)

- My calculator should not allow a number to begin with multiple zeroes (and only one if it's a decimal value below 1) (US 10)

- Pressing a decimal point appends a decimal point to the number. Only one decimal point should be allowed per number. (US 11)

- I should be able to perform any operation on numbers containing decimal points (US 12)

- If two or more operators are entered consecutively, the last operator wins, unless it's "-" (which makes the following number negative) (US 13)

- Pressing an operator after = should start a new calculation starting with the existing result (US 14)

- Precision to at least 4 decimal places if not more. (US 15)

  

## THE PLAN:

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/gOGLbrp). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

​	Easy peasy, lemon squeezy. Early note

### 2: Pass US 6 (and 7 & 10... sort of)

Since we're going top to bottom, this is the easiest to pass first. We technically pass 7 & 10 too because there's a 0 as the initial value in display, which is the result it's looking for.

### 3 Pass US 1-6

Had to flesh out the rest of the calculator. Probably took too long, but I'm a bit of a perfectionist, plus I wanted to get more practice mapping an array to a grid of components like the calculator keys. I like the result. The keys have a blue hover, and if you click the blank one it alerts "This button does nothing!" (instead of triggering the function to handle a normal keypress);

![calculator image](https://letmypeoplecode.github.io/freeCodeCamp_Front_End_Development_Libraries/img/calc1.png)

### Passing functionals (US 7-15)

This came up with some interesting challenges. To get a high-precision float that didn't suffer from approximations, I found `parseFloat(result).toPrecision(15)` worked nicely. But it also returned a lot of extra right-padded zeros to get to the level of precision. But that caused US 9 to fail. 

I was frustrated. I was getting the right answer. Why was it failing? Because instead of parsing the `innerText` of `#display` back to a float, the test was comparing a string value that had the zeros already stripped. 

How to solve it? Wrapping it in another `parseFloat()` stripped extra zeros and it made the answers look nicer too.

I also thought I'd solved US 11, but when I looked at the results, I realized that I had not. I prevented consecutive decimal points, but not "numbers" like 5.5.5. A little string magic later (to make sure there hadn't been a decimal since the last operator), and that passed too.

The last one I solved was the no double operators unless the second was a minus. 

I added a few edge cases the user stories didn't handle. You can undo a negative with a +.

### Closing Thoughts

I might do a little editing on the code, because it felt a little spaghetti-ish... not that there were too many functions, but they felt a little disorganized.

If I was going to improve it, I might add a few more operators or make it possible to substitute keyboard presses for clicking numbers.