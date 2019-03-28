import React, { Component } from 'react'

class RemoveButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removeFlag: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setFlag(false);
        }
    }

    setFlag = (value) => {
        this.setState({removeFlag: value});
    }

    render() {
        const { removeFlag } = this.state;

        if (!removeFlag) {
            return (
                <button
                    type="button"
                    className="danger"
                    onClick={() => this.setFlag(true)}
                >
                    Remove Me !!!!!
                </button>
            );
        } else {
            return (
                <div>
                    <button
                        type="button"
                        onClick={() => this.setFlag(false)}
                    >
                        Nevermind, Don't Remove
                    </button>

                    <button
                        type="button"
                        onClick={() => this.props.remove()}
                    >
                        Yes, Remove Me
                    </button>
                </div>
            );
        }
    }
};

export default RemoveButton;