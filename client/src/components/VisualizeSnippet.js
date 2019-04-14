import React from "react";
import axios from "axios";

const uuidv4 = require("uuid/v4");

class VisualizeSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: {}
    };
  }

  componentDidMount() {
    if (this.props.snippetData && this.props.interpsData) {
      this.setState({
        snippet: this.props.snippetData,
        interps: this.props.interpsData,
        snippetChars: this.props.snippetData.text.split("")
      });
    } else {
      let id = this.props.snippetId;
      if (this.props.match) {
        id = this.props.match.params.id;
        if (id === undefined) {
          id = this.props.snippetId;
        }
      }
      axios
        .get(`/api/snippets/${id}`)
        .then(res => {
          if (res.data) {
            this.setState({
              snippet: res.data[0],
              interps: res.data[0].interps,
              snippetChars: res.data[0].text.split("")
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let snippet = <div />;

    if (this.state.interps) {
      snippet = this.state.snippetChars.map((value, index) => {
        const characterHighlights = this.state.interps.map((v, i) => {
          return v.selection[index];
        });
        const sum = characterHighlights.reduce((total, value) => {
          if (value) {
            return total + 1;
          }
          return total;
        });
        const percentHighlighted = sum / this.state.interps.length;
        const highlight = this.props.method === "highlight";
        const opacity = this.props.method === "opacity";
        const style = {
          backgroundColor: highlight
            ? `rgba(249, 140, 94, ${percentHighlighted.toString()})`
            : "",
          color: opacity
            ? `rgba(0, 0, 0, ${percentHighlighted.toString()})`
            : "",
          fontSize: opacity
            ? `${Math.round(percentHighlighted * 100).toString()}px`
            : "",
          fontWeight: opacity && percentHighlighted === 1 ? "bold" : "",
          padding:
            opacity && percentHighlighted > 0  
              ? `0px ${(1 - percentHighlighted) * 15}px`
              : ""
          //   lineHeight: opacity ? `${Math.round(percentHighlighted * 100).toString()}px` : "",
        };
        return (
          <span style={style} key={uuidv4()}>
            {value}
          </span>
        );
      });
    }

    return <div>{snippet}</div>;
  }
}

export default VisualizeSnippet;
