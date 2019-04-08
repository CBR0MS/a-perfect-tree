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
        <div className="item">
          <h4>{item.name}</h4>
          <button onClick={() => this.playGame(item.id)}>Play</button>
        </div>
      );
    });

    return (
      <div>
        <h1>Hi {this.props.userId}</h1>
        {gameJSX}
      </div>
    );
  }
}

export default Home;
