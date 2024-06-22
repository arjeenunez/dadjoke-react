import React, { Component } from "react";
import "./Jokeitems.css"

class Jokeitem extends Component {
    static defaultProps = {
        emojis: ["😭", "😫", "😟", "😊", "😁", "😃", "😂"],
        colors: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
    }
    constructor(props) {
        super(props);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }
    upvote() {
        this.props.changeVotes(this.props.ident, 1)
    }
    downvote() {
        this.props.changeVotes(this.props.ident,0)
    }

    render() {
        const { votes, text } = this.props;
        let decide = 3;
        if (votes >= 5) decide = 4;
        if (votes >= 10) decide = 5;
        if (votes >= 15) decide = 6;
        if (votes <= -5) decide = 2;
        if (votes <= -10) decide = 1;
        if (votes <= -15) decide = 0;

        const buttonStyle = {border: `2px solid ${this.props.colors[decide]}`}
        return (
            <li className="Jokeitems">
                <div className="Jokeitems-container">
                    <button onClick={this.upvote}>↑</button>
                    <span className="Jokeitems-votes" style={buttonStyle}>{votes}</span>
                    <button onClick={this.downvote}>↓</button>
                    <span className="Jokeitems-text">{text}</span>
                </div>
                <div className="Jokeitems-emoji">{ this.props.emojis[decide]}</div>
            </li>
        )
    }
}

export default Jokeitem;