

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
