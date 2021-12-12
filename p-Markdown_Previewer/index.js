const startText = `# This is our H1 
## This is our H2

This [links to my blog](https://LetMyPeopleCode.com)

And here's a straight-up URL: https://LetMyPeopleCode.com

This is some \`inline code\`.

\`\`\`
let myText = "This is a code block"
myText == "With lines"
\`\`\`

- this is a list item
> this is a blockquote

![alt text goes here](https://placekitten.com/200/300)

**this is bolded text**`;

const App = () => {
  const [text, setText] = React.useState(startText);

  return (
    <div>
      <Editor text={text} setText={setText} />
      <Previewer text={text} />
    </div>
  );
};

const Editor = ({ text = "", setText }) => {
  //update the state with the textarea contents
  function updateState(event) {
    setText(event.target.value);
  }
  return (
    <div>
      <label for="editor">Markdown Text:</label>
      <textarea
        id="editor"
        rows="10"
        onChange={updateState}
        class="form-control"
      >
        {text}
      </textarea>
    </div>
  );
};

const Previewer = (state) => {
  let preview = marked.parse(state.text);
  return (
    <div>
      <label for="preview">Preview:</label>
      <div
        id="preview"
        class="form-control"
        dangerouslySetInnerHTML={{ __html: preview }}
      ></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
