import React from 'react';

const AppComponent = React.createClass({

    threePic: function() {
        this.setState({
            numChildren: 4
        });
    },

    fivePic: function() {
        this.setState({
            numChildren: 6
        });
    },

    getInitialState: function() {
        return {
            numChildren: 5,
            scores: 0,
            cards: [1,2,3,4,5]
        };
    },

    onAddChild: function() {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    },

    checked: function() {

        //change picture to random picture plus add score
        this.setState({
            //number: Math.floor(Math.random() * (7)) + 1
            scores: this.state.scores + 1
        });
    },

    render: function() {
        const children = this.state.cards.map(card => {
            return <Picture key={card} number={card} checked={this.checked} />
        });


        return (
            <div>
                <Counter scores={this.state.scores} />
                <GameBoard threePic={this.threePic} fivePic={this.fivePic} addChild={this.onAddChild}>
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
                <Button onClick={this.props.fivePic} text="5 Pictures" />
                <Button onClick={this.props.threePic} text="New pictures plus one" />

                <div id="children-pane" className="inline">
                  {this.props.children}
                </div>
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

    render: function() {
        return (
            <div className="pictures">
                <a href="#" className="butt">
                    <img src={'./images/favicon' + this.props.number +'.ico'} alt="picture" onClick={this.props.checked} className="img-responsive images lookups"/>
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