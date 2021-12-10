# STRUCTURE:
  wrapper element with id: `quote-box` (US 1)
    child content element with id: `text` (US 2)
    child content element with id: `author` (US 3)
    child clickable element with id: `new-quote` (US 4)
    child clickable "a" element with id: `tweet-quote` (US 5)

# BEHAVIOR:
  On load:
    first quote is displayed in `#text` (US 6)
    quote's author is displayed in `#author` (US 7)
    `#quote-box` is horizontally centered (US 11)
  On `#new-quote` click:
    new quote is displayed in `#text` (US 8)
    new author is displayed in `#author` (US 9)
  On `#tweet-quote click`
    a href = "https://twitter.com/intent/tweet" + quote (see docs) (US 10)



