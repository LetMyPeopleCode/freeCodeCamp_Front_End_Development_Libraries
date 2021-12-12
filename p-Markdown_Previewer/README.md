# freeCodeCamp Markdown Previewer

## INTRODUCTION

This is my interpretation of the requirements doc that freeCodeCamp provides. It simplifies the User Stories and puts them in the order of the project execution to serve as my guide.

## STRUCTURE:
  - `textarea` with id of "editor" (US 1)
  - element with id of "preview" (US 2)

## BEHAVIOR:
- when `editor` is changed, `preview` updates (US 3)
- when `editor` content is markdown, `preview` displays rendered HTML (US 4)
- **On-Load**
  - editor default text contains sample markdown for: (US 5)
    - H1
    - H2
    - link
    - inline code
    - code block
    - list item
    - blockquote
    - image
    - bolded text

  - default text is rendered in previewer (US 6)

- **OPTIONAL** - Markdown renders carriage returns to \<br /\> (US 7)


## THE PLAN:

The working version is [saved in a CodePen](https://codepen.io/GregBulmash/pen/RwLGMqm). I am saving the HTML, CSS, and JS portions here for backup.

### 1: Fail All Tests

Once again, I pass 1 because it just requires some sort of tech stack, but the remaining tests fail.

### 2: Pass US 1 & 2

### 3: Pass US 3 & 5

Ensure both components (editor and preview) use a state variable, so they're "always" in sync. Then fill the initial value of the state variable with the requirements for 5.

### 5: US 4 & 6

Add the wiring to render the markdown as HTML in the preview component.

### 6: US 7

Yes, it's optional, but it seems like something worth adding so I'm not just doing the minimum.

 