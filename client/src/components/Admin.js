import React from "react";
import axios from "axios";

const uuidv4 = require("uuid/v4");

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      snippets: [],
      gameName: "",
      gameSnippets: "",
      snippetText: ""
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addGame = this.addGame.bind(this);
    this.addSnippet = this.addSnippet.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("/api/games")
      .then(res => {
        if (res.data) {
          this.setState({
            games: res.data
          });
        }
      })
      .catch(err => console.log(err));

    axios
      .get("/api/snippets")
      .then(res => {
        if (res.data) {
          this.setState({
            snippets: res.data
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addGame() {
    if (this.state.gameName.length > 0 && this.state.gameSnippets.length > 0) {
      const formattedSnippets = this.state.gameSnippets
        .split(", ")
        .map(item => {
          return { id: item };
        });
      console.log(formattedSnippets);
      const postData = {
        name: this.state.gameName,
        id: uuidv4(),
        snippets: formattedSnippets
      };
      axios
        .post("/api/games", postData)
        .then(res => {
          if (res.data) {
            this.setState({ gameName: "", gameSnippets: "" });
            this.getData();
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("input field required");
    }
  }

  addSnippet() {
    if (this.state.snippetText.length > 0) {
      const postData = {
        text: this.state.snippetText,
        id: uuidv4(),
        interps: []
      };
      axios
        .post("/api/snippets", postData)
        .then(res => {
          if (res.data) {
            this.setState({ snippetText: "" });
            this.getData();
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("input field required");
    }
  }

  deleteItem(id, resource) {
    axios
      .delete(`/api/${resource}/${id}`)
      .then(res => {
        if (res.data) {
          this.getData();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let { games, snippets } = this.state;

    const gameJSX = games.map(item => {
      return (
        <div className="item" key={uuidv4()}>
          <h4>Name</h4>
          <p>{item.name}</p>
          <h4>ID</h4>
          <p>{item.id}</p>
          <button onClick={() => this.deleteItem(item.id, "games")}>
            Delete
          </button>
        </div>
      );
    });
    const snippetJSX = snippets.map(item => {
      return (
        <div className="item" key={uuidv4()}>
          <h4>Text</h4>
          <p>{item.text}</p>
          <h4>ID</h4>
          <p>{item.id}</p>
          <button onClick={() => this.deleteItem(item.id, "snippets")}>
            Delete
          </button>
        </div>
      );
    });

    return (
      <div className="wrapper">
        <h1>Games</h1>

        <div className="wrapperFlex">
          {gameJSX}

          <div className="item">
            <h2>Add Game</h2>
            <h4>Name</h4>
            <input
              type="text"
              onChange={this.handleChange}
              name="gameName"
              value={this.state.gameName}
            />
            <h4>Snippets</h4>
            <input
              type="text"
              onChange={this.handleChange}
              name="gameSnippets"
              value={this.state.gameSnippets}
            />
            <button onClick={this.addGame}>Add Game</button>
          </div>
        </div>

        <h1>Snippets</h1>
        <div className="wrapperFlex">
          {snippetJSX}
          <div className="item">
            <h2>Add Snippet</h2>
            <h4>Text</h4>
            <input
              type="text"
              onChange={this.handleChange}
              name="snippetText"
              value={this.state.snippetText}
            />
            <button onClick={this.addSnippet}>Add Snippet</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
