import React, { Component } from "react";
import Jokeitem from "./Jokeitems";
import axios from "axios";
import "./Jokes.css";

class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: []};
        this.getJokes = this.getJokes.bind(this);
        this.addJoke = this.addJoke.bind(this);
        this.changeVotes = this.changeVotes.bind(this);
        this.storingLocal = this.storingLocal.bind(this);
    }

    // Method for getting 10 more jokes

    async getJokes(val) {
        const jokes = [];
        for (let i = 0; i < val; i++) {
            const getJoke = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
            const joke = {
                text: getJoke.data.joke,
                id: getJoke.data.id,
                votes: 0
            }
            jokes.push(joke);
        }
        return jokes;
    }

    // Refactored for using localStorage

    storingLocal(obj) {
        window.localStorage.clear();
        window.localStorage.setItem("jokes", JSON.stringify(obj));
        this.setState(st => ({ jokes: obj }));
    }

    // Adding more jokes

    async addJoke() {
        const joke = await this.getJokes(1);
        const newStoredJokes = [...JSON.parse(window.localStorage.getItem("jokes")), ...joke];
        this.storingLocal(newStoredJokes);
    }

    // Setting up votes

    changeVotes(ident, val) {
        const newJokes = [...this.state.jokes.map(el => el.id === ident ? {text: el.text, votes: val ? el.votes += 1 : el.votes -= 1, id: el.id} : el)];
        this.storingLocal(newJokes);
    }

    // Check for jokes in localStorage, if does not exist, fetch and add jokes

    async componentDidMount() {
        if (!window.localStorage.getItem("jokes")) {
            const newJokes = await this.getJokes(10);
            this.storingLocal(newJokes);
        } else {
            const reloadJokes = JSON.parse(window.localStorage.getItem("jokes"));
            this.setState(st => ({ jokes: reloadJokes }));
        }
    }

    // Render the jokes

    render() {
        console.log(this.state.jokes);
        return (
            <div className="Jokes">
                <div className="Jokes-hero">
                    <h1><span>Dad</span><span>Jokes</span></h1>
                    <p>😂</p>
                    <button onClick={this.addJoke} className="Jokes-button">New Jokes</button>
                </div>
                <ul className="Jokes-list">
                    {this.state.jokes.map(el => (
                        <Jokeitem key={el.id} text={el.text} ident={el.id} votes={el.votes} changeVotes={this.changeVotes} />
                    ))}
                </ul>
            </div>
        )
}
}

export default Jokes;