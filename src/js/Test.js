import React from 'react';

const AppComponent = React.createClass({
    getInitialState: function() {
           return {numChildren: 0}
    },

    render: function(){
        const children = [];

        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<ChildComponent number={i} />);
        };

        return (
            <ParentComponent addChild={this.onAddChild.bind(this)}>
                {children}
            </ParentComponent>
        );
    },

    onAddChild: function() {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
});

const ParentComponent = React.createClass ({
    render: function() {
        <div constName="card calculator">
            <p><a href="#" onClick={this.props.addChild}>Add Another Child Component</a></p>
            <div id="children-pane">
              {this.props.children}
            </div>
        </div>
    }
});

const ChildComponent = React.createClass ({
    render: function() {
        return (
            <div>{"I am child " + this.props.number}</div>
        );
    }
});