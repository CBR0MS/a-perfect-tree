import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import ReactTooltip from 'react-tooltip'
import SelectionHighlighter from 'react-highlight-selection'

import VisualizeSnippet from './VisualizeSnippet'

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
      loadingNew: true,
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
    console.log("User " + this.props.userId);
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
            loadingNew: false,
          });
        }
      })
      .catch(err => console.log(err));
  }

  nextPage() {
    if (this.state.pageNum + 1 > this.state.gameSnippets.length) {
      this.setState({ redirect: `/game-results/${this.state.gameId}` });
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
    const newRange = {
        text: range.selection,
        start: range.selectionStart,
        end: range.selectionEnd,
    }
    // since we are allowing just one selection at a time, add the new range by itself. Rather than this.state.highlightedRange.concat(newRange)
    this.setState({
      highlightedRange: [newRange]
    });
  }

  resetContentSelect() {
    this.setState({ loadingNew: true, highlightedRange: [] }, ()=> {
        // have to reset the highlight by rerendering the highlight component
        window.setTimeout(() => {
            this.setState({loadingNew: false})
        }, 100)
        
    });
  }

  submitCurrent() {
    // convert range to array of indicies with bool for selection
    let highlightedChars = Array.apply(
      null,
      Array(this.state.currSnippet.text.length)
    ).map(value => false);

    // leaving this as an array for easy conversion to multiple line selection later
    for (const i in this.state.highlightedRange) {
      const { start, end } = this.state.highlightedRange[i];
      highlightedChars = highlightedChars.map((value, index) => {
        if (index >= start && index <= end) {
          return true;
        }
        return value;
      });
    }

    this.setState(
      {
        submittedCurrent: true,
        fullSnippets: this.state.fullSnippets.concat(this.state.currSnippet),
        selections: this.state.selections.concat([highlightedChars])
      },
      () => {
        if (
          this.state.pageNum === this.state.gameSnippets.length &&
          this.state.fullSnippets.length === this.state.selections.length
        ) {
          for (const i in this.state.fullSnippets) {
            const interpData = {
              user: this.props.userId,
              selection: this.state.selections[i]
            };
            const postData = {
              text: this.state.fullSnippets[i].text,
              id: this.state.fullSnippets[i].id,
              interps:
                this.state.fullSnippets[i].interps.length > 0
                  ? this.state.fullSnippets[i].interps.concat([interpData])
                  : [interpData]
            };
            axios
              .patch(`/api/snippets/${this.state.fullSnippets[i].id}`, postData)
              .then(res => {
                if (res.data) {
                  console.log(res.data);
                }
              })
              .catch(err => console.log(err));
          }
        }
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    
    let snip = <div />;
    let allSnip = <div />;
    if (this.state.currSnippet && !this.state.loadingNew) {
      snip = ( 
        <SelectionHighlighter
        text={this.state.currSnippet.text}
        selectionHandler={this.handleContentSelect}
        customClass='highlighted'
      />
      );
    }
    
    if (this.state.submittedCurrent) {
        
      // add the current interp to list of interps to visualize
      const interps = this.state.fullSnippets[
        this.state.pageNum - 1
      ].interps.concat({
        selection: this.state.selections[this.state.pageNum - 1]
      });

      allSnip = <VisualizeSnippet snippetData={this.state.currSnippet} interpsData={interps}/>
    }

    const gotInput = this.state.highlightedRange.length > 0;
    let buttons = (
      <div>
        <button onClick={this.resetContentSelect} className="light">
          Reset Selection
        </button>
        <button
          onClick={gotInput ? this.submitCurrent : () => {}}
          className={gotInput ? "" : "disabled"}
          data-tip data-for="helpMakingSelection"
        >
          Compare Selection →
        </button>
        <ReactTooltip id='helpMakingSelection' place="top" type="dark" effect="solid" className='helpTooltip' getContent={() =>  gotInput ? null : 'Highlight the meaningful portion of the text to continue' } />
      </div>
    );
    if (this.state.submittedCurrent) {
      buttons = (
        <button onClick={this.nextPage}>
          {this.state.pageNum === this.state.gameSnippets.length
            ? "Summary →"
            : "Next Page →"}
        </button>
      );
    }
    console.log(this.state);
    return (
      <div className="playWrapper">
        <div className="playHeader">
          <span style={{float: 'left'}}>{this.state.gameName}</span>
          <span style={{float: 'right'}}>{this.state.pageNum}/{this.state.gameSnippets.length}</span>
        </div>
        <div className="snipArea">
          <div className="padder">{snip}</div>
          <div className="padder">{allSnip}</div>
        </div>
        {buttons}
      </div>
    );
  }
}

export default Play;
