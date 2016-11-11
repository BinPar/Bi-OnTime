import React from 'react';

export default class StyleOnScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTop: 0
        };
    }

    render() {
        let classes = this.props.className || "";

        if(this.state.currentTop > this.props.fromTop) classes += (classes?" ":"") +  this.props.classToAdd;

        return <div {...this.props} className={classes}>{this.props.children}</div>
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;

        this.setState({
            currentTop: scrollTop
        });
    }
}