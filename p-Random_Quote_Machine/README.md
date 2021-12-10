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
