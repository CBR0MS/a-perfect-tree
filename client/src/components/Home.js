import React from "react";
import axios from "axios";

import { Redirect } from "react-router";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.getGames = this.getGames.bind(this);
    this.playGame = this.playGame.bind(this);
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
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
  }

  playGame(id) {
    this.setState({ redirect: `/play/${id}/?page=1` });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { games } = this.state;

    const gameJSX = games.map(item => {
      return (
        <div className="item centered">
          <h2>{item.name}</h2>
          <p>{item.snippets.length} Snippets</p>
          <button onClick={() => {}}>View Results</button>
          <button onClick={() => this.playGame(item.id)}>Contribute →</button>
        </div>
      );
    });

    return (
      <div className="wrapper">
        <div className="wrapperFlex">{gameJSX}</div>
      </div>
    );
  }
}

export default Home;
