import React from 'react';
import AllCards from './AllCards.js';
var availableCards = AllCards;

const AppComponent = React.createClass({

    getInitialState: function() {

        var shuffledCards = this.shuffle();
        return {
            shuffledCards: shuffledCards,
            scores: 0,
            cards: shuffledCards.slice(0,5),
            nextCard: 5,
            key: 0,
            timeLeft: 0
        };
    },

    threePic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            scores: 0,
            cards: shuffledCards.slice(0,3),
            nextCard: 3,
            key: 0
        });
    },

    sixPic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            scores: 0,
            cards: shuffledCards.slice(0,6),
            nextCard: 6,
            key: 0
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

    reset: function() {
        this.setState({
            scores: 0
        });
    },

    checked: function(index) {

            //nextCard should not exceed the length of the shuffledCards
        if (this.state.nextCard > (this.state.shuffledCards.length-1)) {
            //start over on the shuffled cards
            this.state.nextCard = 0;
        }

        this.state.cards[index] = this.state.shuffledCards[this.state.nextCard]


        //change picture to nextCard picture plus add score
        this.setState({
            cards: this.state.cards,
            nextCard: this.state.nextCard + 1,
            scores: this.state.scores + 1
        });
    },

    startTime: function() {
        this.setState({
            timeLeft: 900
        })

        var func = () => {
            this.setState({
                timeLeft: this.state.timeLeft-1
            })
            setTimeout(func,1000);
        };

        setTimeout(func, 1000);


    },


    render: function() {
        const children = this.state.cards.map((card, index) => {
            this.state.key = this.state.key + 1
            return <Picture key={this.state.key} checked={this.checked} index={index} image={card.image}/>
        });


        return (
            <div>

                <GameBoard threePic={this.threePic} sixPic={this.sixPic} reset={this.reset} scores={this.state.scores} startTime={this.startTime} timeLeft={this.state.timeLeft}>
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
                <Button onClick={this.props.startTime} text="Start timer" />
                <Timer timeLeft={this.props.timeLeft} />
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
        this.props.checked(this.props.index)
    },

    render: function() {
        return (
            <div className="pictures">
                <a href="#" className="butt" onClick={this.clicked} >
                    <img src={this.props.image} alt="picture" className="img-responsive images lookups"/>
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

const Timer = React.createClass({

    render: function() {
        return (
            <div className="timer">
                {"Time left: " + this.props.timeLeft + "s"}
            </div>
        )
    }
})

const GameOver = React.createClass({

    render: function() {
        return (
            <div className="gameover">
                GameOver
            </div>
            )
    }
})


export default AppComponent;