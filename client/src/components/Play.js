import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Highlightable from "highlightable";

const queryString = require("query-string");

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      highlightedRange: [],
      gameSnippets: [],
      fullSnippets: [],
      selections: [],
      submittedCurrent: false
    };
    this.getGame = this.getGame.bind(this);
    this.getSnippet = this.getSnippet.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleContentSelect = this.handleContentSelect.bind(this);
    this.resetContentSelect = this.resetContentSelect.bind(this);
    this.submitCurrent = this.submitCurrent.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const parsed = queryString.parse(this.props.location.search);

    this.setState({
      pageNum: parseInt(parsed.page),
      gameId: id
    });
    this.getGame(id);
  }

  getGame(id) {
    axios
      .get(`/api/games/${id}`)
      .then(res => {
        if (res.data) {
          this.setState({
            gameName: res.data[0].name,
            gameSnippets: res.data[0].snippets
          });
          this.getSnippet(this.state.pageNum);
        }
      })
      .catch(err => console.log(err));
  }

  getSnippet(index) {
    axios
      .get(`/api/snippets/${this.state.gameSnippets[index - 1].id}`)
      .then(res => {
        if (res.data) {
          this.setState({
            currSnippet: res.data[0],
          });
        }
      })
      .catch(err => console.log(err));
  }

  nextPage() {
    if (this.state.pageNum + 1 > this.state.gameSnippets.length) {
      this.setState({ redirect: "/" });
    } else {
      this.props.history.push({
        pathname: `/play/${this.state.gameId}/`,
        search: `?page=${this.state.pageNum + 1}`
      });
      this.setState({
        pageNum: this.state.pageNum + 1,
        submittedCurrent: false
      });
      this.getSnippet(this.state.pageNum + 1);
      this.resetContentSelect();
    }
  }

  handleContentSelect(range) {
    this.setState({
      highlightedRange: this.state.highlightedRange.concat(range)
    });
  }

  resetContentSelect() {
    this.setState({ highlightedRange: [] });
  }

  submitCurrent() {
    this.setState({ 
        submittedCurrent: true,
        fullSnippets: this.state.fullSnippets.concat(this.state.currSnippet),
        selections: this.state.selections.concat(this.state.highlightedRange) 
    }, () => {

        if (this.state.pageNum === this.state.gameSnippets.length) {
            for (const i in this.state.fullSnippets) {

                const interpData = {
                    user: this.props.userId,
                    selection: this.state.selections[i]
                }
                const postData = {
                    text: this.state.fullSnippets[i].text,
                    id: this.state.fullSnippets[i].id,
                    interps: this.state.fullSnippets[i].interps 
                            ? this.state.fullSnippets[i].interps.concat(interpData)
                            : [interpData]
                }
                axios
                .patch(`/api/snippets/${this.state.fullSnippets[i].id}`, postData)
                .then(res => {
                  if (res.data) {
                    console.log(res.data)
                  }
                })
                .catch(err => console.log(err));
            }
        }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let snip = <div />;
    if (this.state.currSnippet) {
      snip = (
        <div className="snipArea">
          <Highlightable
            ranges={this.state.highlightedRange}
            enabled={true}
            onTextHighlighted={this.handleContentSelect}
            id="snippet"
            highlightStyle={{
              backgroundColor: "#ffcc80"
            }}
            text={this.state.currSnippet.text}
          />
        </div>
      );
    }

    let buttons = (
      <div>
        <button onClick={this.resetContentSelect}>Reset Selection</button>
        <button onClick={this.submitCurrent}>Compare Selection</button>
      </div>
    );
    if (this.state.submittedCurrent) {
      buttons = (
        <button onClick={this.nextPage}>
          {this.state.pageNum === this.state.gameSnippets.length
            ? "Finish"
            : "Next Page"}
        </button>
      );
    }
    console.log(this.state);
    return (
      <div className="playWrapper">
        {snip}
        {buttons}
      </div>
    );
  }
}

export default Play;
