import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import VisualizeSnippet from "./VisualizeSnippet";

const uuidv4 = require("uuid/v4");
const queryString = require("query-string");

class VisualizeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: ""
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    const { id } = this.props.match.params;

    if (parsed.next) {
      axios
        .get(`/api/games/`)
        .then(res => {
          if (res.data) {
            let nextIndex = 0;
            for (const i in res.data) {
              if (res.data[i].id === id) {
                nextIndex = i;
              }
            }
            nextIndex = parseInt(nextIndex);
            if (nextIndex + 1 > res.data.length - 1) {
              nextIndex = 0;
            } else {
              nextIndex += 1;
            }
            this.setState({ nextPage: `/play/${res.data[nextIndex].id}` });
          }
        })
        .catch(err => console.log(err));
    }

    axios
      .get(`/api/games/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({
            gameName: res.data[0].name,
            gameSnippets: res.data[0].snippets
          });
          axios
            .get(`/api/snippets/${res.data[0].snippets[0].id}`)
            .then(res => {
              if (res.data) {
                this.setState({
                  gamePlays: res.data[0].interps.length
                });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let viz = <div />;
    let next = <div />;

    if (this.state.gameSnippets) {
      viz = this.state.gameSnippets.map(value => (
        <div className="padder" key={uuidv4()}>
          <VisualizeSnippet snippetId={value.id} method="opacity" />
        </div>
      ));
    }

    if (this.state.nextPage) {
      next = (
        <div>
          <button
            onClick={() => this.setState({ redirect: "/" })}
            className="light"
          >
            All Groups
          </button>

          <button
            onClick={() => this.setState({ redirect: this.state.nextPage })}
          >
            Interpret Another Group →
          </button>
        </div>
      );
    } else {
        next = (<div className="backButton" onClick={() => this.setState({redirect: '/'})}>←</div>)
    }

    return (
      <div className="playWrapper">
        <div className="playHeader">
          <span style={{ float: "left" }}>{this.state.gameName}</span>
          {/*<span style={{ float: "right" }}>{this.state.gamePlays} Interpretations</span>*/}
        </div>
        <div className="snipArea">{viz}</div>
        {next}
      </div>
    );
  }
}

export default VisualizeGame;
