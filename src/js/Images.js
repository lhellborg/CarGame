import React from 'react';
import AllCards from './AllCards.js';
var availableCards = AllCards;

const AppComponent = React.createClass({

    threePic: function() {
        this.setState({
            cards: [1,2,3]
        });
    },

    sixPic: function() {
        this.setState({
            cards: [1,2,3,4,5,6]
        });
    },

    shuffle: function(input) {
        var newArray = []
        for (var i = input.length-1; i >=0; i--) {

            var randomIndex = Math.floor(Math.random()*(i+1));
            newArray[i] = input[randomIndex];
        }
        return newArray;
    },

    getInitialState: function() {
        const shuffledCards = this.shuffle(availableCards);
        return {
            scores: 0,
            cards: shuffledCards
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
                <Counter scores={this.state.scores} />
                <GameBoard threePic={this.threePic} sixPic={this.sixPic} reset={this.reset}>
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
                {"Scores: " + this.props.scores}
            </div>
        )

    }
})


export default AppComponent;