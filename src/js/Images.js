import React from 'react';
import AllCards from './AllCards.js';
var availableCards = AllCards;

const AppComponent = React.createClass({

    threePic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            cards: shuffledCards.slice(0,3)
        });
    },

    sixPic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            cards: shuffledCards.slice(0,6),
            nextCard: 6,
        });
    },

    shuffle: function() {
        var input = availableCards.slice(0);
        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;

        }
        return input;
    },

    getInitialState: function() {

        var shuffledCards = this.shuffle();
        return {
            scores: 0,
            cards: shuffledCards.slice(0,4),
            nextCard: 4
        };
    },

    reset: function() {
        this.setState({
            scores: 0
        });
    },

    checked: function(number) {

        //change picture to random picture plus add score
        this.setState({
            //cards.remove[indexOf(number)]
            //number: Math.floor(Math.random() * (7)) + 1
            scores: this.state.scores + 1
        });
    },

    render: function() {
        const children = this.state.cards.map(card => {
            return <Picture key={card.key} number={card.key} checked={this.checked} />
        });


        return (
            <div>

                <GameBoard threePic={this.threePic} sixPic={this.sixPic} reset={this.reset} scores={this.state.scores}>
                    {children}
                </GameBoard>

            </div>

        );
    }
});


const GameBoard = React.createClass({
    render: function() {
       return(
            <div>
                <Button onClick={this.props.threePic} text="3 Pictures" />
                <Button onClick={this.props.sixPic} text="6 Pictures" />

                <div id="children-pane" className="inline">
                  {this.props.children}
                </div>

                <Button onClick={this.props.reset} text="Reset scores" />
                <Counter scores={this.props.scores} />
            </div>
        );
    }
});

const Button = React.createClass({
    render: function() {
        return (
            <a className="button" onClick={this.props.onClick}>
                <span>{this.props.text}</span>
            </a>
        )
    }
});

const Picture = React.createClass({
    clicked: function() {
        this.props.checked(this.props.number)
    },

    render: function() {
        return (
            <div className="pictures">
                <a href="#" className="butt">
                    <img src={'./images/favicon' + this.props.number +'.ico'} alt="picture" onClick={this.clicked} className="img-responsive images lookups"/>
                </a>

            </div>
        );
    }
});

const Counter = React.createClass({

    render: function() {
        return (
            <div className="counter">
                <div className="scoreName">
                    {"Scores: "}
                </div>
                <div className="scoreNr">
                    {this.props.scores}
                </div>
            </div>
        )

    }
})


export default AppComponent;