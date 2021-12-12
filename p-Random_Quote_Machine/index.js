/* CodePen JS settings
    Using: https://codepen.io/pen/?template=xxXEWPY
    Removed JQuery from included libs because I didn't use it.
*/

const quotes = [
  {
    quote:
      "The problem with online quotes is you can never be sure the person to whom they're attributed actually said them.",
    author: "Abraham Lincoln"
  },
  {
    quote:
      "It is sobering to consider that when Mozart was my age, he had already been dead for a year.",
    author: "Tom Lehrer"
  },
  {
    quote: "Never trust a man with a small black moustache.",
    author: "P.G. Wodehouse"
  },
  {
    quote: "He knew the precise psychological moment when to say nothing.",
    author: "Oscar Wilde"
  },
  { quote: "I can't be overdrawn. I still have checks.", author: "Anon." },
  {
    quote:
      "I don't want any yes-men around me. I want everybody to tell me the truth even if it costs them their jobs.",
    author: "Samuel Goldwyn"
  },
  {
    quote:
      "Anyone who lives within his means suffers from a lack of imagination.",
    author: "Lionel Stander"
  },
  {
    quote:
      "An appeaser is one who feeds a crocodile hoping it will eat him last.",
    author: "Winston Churchill"
  },
  {
    quote:
      "When in doubt, make a fool of yourself. There is a microscopically thin line between being brilliantly creative and acting like the most gigantic idiot on earth. So what the hell, leap.",
    author: "Cynthia Heimel"
  },
  {
    quote: "There cannot be a crisis next week. My schedule is already full.",
    author: "Henry Kissinger"
  },
  {
    quote: "No one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "If we lose this war, I'll start another in my wife's name.",
    author: "Moshe Dyan, during the Six-day war"
  },
  {
    quote:
      "I don't want a lawyer to tell me what I cannot do; I hire him to tell me how to do what I want to do.",
    author: "J.P. Morgan"
  },
  {
    quote:
      "Let no one suppose that the words doctor and patient can disguise from the parties that they are employer and employee.",
    author: "G.B. Shaw"
  },
  {
    quote: "People become who they are. Even Beethoven became Beethoven.",
    author: "Randy Newman"
  },
  {
    quote: "Some people pay a compliment as if they expected a receipt.",
    author: "Kin Hubbard"
  }
];

class QuoteBox extends React.Component {
  /* this is our "app" */
  constructor(props) {
    super(props);
    let num = Math.floor(Math.random() * quotes.length);
    this.state = {
      currentQuote: num
    };
    this.nextQuote = this.nextQuote.bind(this);
  }

  nextQuote() {
    this.setState({ currentQuote: Math.floor(Math.random() * quotes.length) });
  }

  render() {
    return (
      <div>
        <b>Quote Text:</b>
        <QuoteText quote={quotes[this.state.currentQuote].quote} />
        <QuoteAuthor author={quotes[this.state.currentQuote].author} />
        <LinkRow
          tweetText={encodeURI(
            quotes[this.state.currentQuote].quote +
              "\n\n  -- " +
              quotes[this.state.currentQuote].author
          )}
          next={this.nextQuote}
        />
      </div>
    );
  }
}

const QuoteText = (props) => {
  return <div id="text">"{props.quote}"</div>;
};

const QuoteAuthor = (props) => {
  return <div id="author"> -- {props.author}</div>;
};

const QuoteTweet = (props) => {
  return (
    <div class="col-sm">
      <a
        href={
          "https://twitter.com/intent/tweet?text=" +
          props.tweetText +
          "&related=LetMyPeopleCode"
        }
        id="tweet-quote"
        target="_top"
      >
        Tweet
      </a>
    </div>
  );
};

const NextButton = (props) => {
  return (
    <div class="col-sm">
      <button onClick={props.getNext} id="new-quote">
        Next
      </button>
    </div>
  );
};

const LinkRow = (props) => {
  return (
    <div id="link-row" class="row" align="center">
      <QuoteTweet tweetText={props.tweetText} />
      <NextButton getNext={props.next} />
    </div>
  );
};

ReactDOM.render(<QuoteBox />, document.getElementById("quote-box"));
