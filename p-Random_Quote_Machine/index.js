$(document).ready(function () {
	console.log('ready!');
});

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h1>You Gorgeous Kid</h1>;
	}
}

ReactDom.render(e(App), '#root');
