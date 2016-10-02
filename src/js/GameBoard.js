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
            timeLeft: 900
        };
    },

    threePic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            scores: 0,
            cards: shuffledCards.slice(0,3),
            nextCard: 3,
            key: 0,
            timeLeft: 900
        });
    },

    sixPic: function() {
        var shuffledCards = this.shuffle();
        this.setState({
            scores: 0,
            cards: shuffledCards.slice(0,6),
            nextCard: 6,
            key: 0,
            timeLeft: 900
        });
    },

    getRandomIntInclusive: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    exchangeCard: function() {

            //nextCard should not exceed the length of the shuffledCards
        if (this.state.nextCard > (this.state.shuffledCards.length-1)) {
            //start over on the shuffled cards
            this.state.nextCard = 0;
        }

        let maxCard = this.state.cards.length-1;
        //replace the existing cards on the board 
        let randomCard = this.getRandomIntInclusive(0,maxCard);


        this.state.cards[randomCard] = this.state.shuffledCards[this.state.nextCard]


        //change picture to nextCard picture plus add score
        this.setState({
            cards: this.state.cards,
            nextCard: this.state.nextCard + 1,
            scores: this.state.scores - 1
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

        clearTimeout(this.timeout1)
        clearTimeout(this.timeout)
        this.setState({
            timeLeft: this.state.timeLeft
        });



        var func = () => {
            this.setState({
                timeLeft: this.state.timeLeft-1
            })
            if (this.state.timeLeft > 0) {
                this.timeout1 = setTimeout(func,1000);
            } else {
                clearTimeout(this.timeout1);
            }

        };

        this.timeout = setTimeout(func, 1000);


    },

    endTime: function() {
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout)
        this.setState({
            timeLeft: this.state.timeLeft
        });
    },

    setNewTime: function(newTime) {
        this.setState({
            timeLeft: newTime
        });
    },


    render: function() {

        if (this.state.timeLeft == 0 && this.state.timeLeft != "") {
            return (
                <GameOver threePic={this.threePic} sixPic={this.sixPic}/>
                )
        } else {

            const children = this.state.cards.map((card, index) => {
                this.state.key = this.state.key + 1
                return <Picture key={this.state.key} checked={this.checked} index={index} image={card.image}/>
            });

            return (
                <div>

                    <GameBoard threePic={this.threePic} sixPic={this.sixPic} exchangeCard={this.exchangeCard} reset={this.reset} scores={this.state.scores} startTime={this.startTime} endTime={this.endTime} timeLeft={this.state.timeLeft} setNewTime={this.setNewTime}>
                        {children}
                    </GameBoard>

                </div>

            );
        }
    }
});


const GameBoard = React.createClass({
    render: function() {
       return(
            <div>
                <div className="topButtons">
                    <Button onClick={this.props.threePic} text="3 Pictures" />
                    <Button onClick={this.props.sixPic} text="6 Pictures" />
                    <Button onClick={this.props.exchangeCard} text="Change 1" />
                </div>
                <div id="children-pane" className="inline">
                  {this.props.children}
                </div>

                <Button onClick={this.props.reset} text="Reset scores" />
                <Counter scores={this.props.scores} />
                <Button onClick={this.props.startTime} text="Start timer" />
                <Button onClick={this.props.endTime} text="stop timer" className="floatRight"/>
                <Timer timeLeft={this.props.timeLeft} setNewTime={this.props.setNewTime}/>

            </div>
        );
    }
});

const Button = React.createClass({
    keydown: function(e) {
        var code = e.target.which;
        if ((code===13) || (code===32)) {
            this.props.onClick()
        }
    },

    render: function() {
        var myClass = "button "
        if (this.props.className) {
            myClass += this.props.className
        }

        return (
            <a href="#" className={myClass} onClick={this.props.onClick} onKeyDown={this.keydown} tabIndex="0">
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
                    {this.props.scores}
                </div>
            </div>
        )

    }
});

const Timer = React.createClass({

    setTime: function(event) {

        this.props.setNewTime(event.target.value)
    },

    render: function() {
        return (
            <div>

                <p className="timer"> <input type="range" min="0" max="3600" step="5" size="8" value={this.props.timeLeft}  onChange={this.setTime}/> </p>

                <div className="timer">
                    {"Time left: "}
                    {Math.floor(this.props.timeLeft/60) + " min "}
                    {this.props.timeLeft % 60 + " s"}
                </div>
           </div>
        )
    }
});

const GameOver = React.createClass({

    render: function() {
        return (
            <div >
                <h1 className="gameoverText gameover">Time run out</h1>
                <h1 className="gameover">Play again?</h1>
                <div className="center">
                    <Button onClick={this.props.threePic} text="3 Pictures" />
                    <Button onClick={this.props.sixPic} text="6 Pictures" />
                </div>
            </div>
            )
    }
});


export default AppComponent;