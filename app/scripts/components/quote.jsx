import React from 'react';

const data = [
    ["The man who smiles when things go wrong has thought of someone to blame it on."],
    ["It's true that we don't know what we've got until we lose it, but it's also true that we don't know what we've been missing until it arrives."],
    ["Never take life seriously. Nobody gets out alive anyway."],
    ["The average woman would rather have beauty than brains, because the average man can see better than he can think."],
    ["There are no stupid questions, just stupid people."],
    ["When I die, I want to go peacefully like my Grandfather did, in his sleep – not screaming, like the passengers in his car."],
    ["Behind every successful man is a surprised woman."],
    ["Son, if you really want something in this life, you have to work for it. Now quiet! They're about to announce the lottery numbers.", "Homer Simpson"],
    ["Hard work never killed anybody, but why take a chance?"],
    ["Last night I lay in bed looking up at the stars in the sky and I thought to myself, where the heck is the ceiling."],
    ["You tried your best and you failed miserably. The lesson is 'never try'.", "Homer Simpson"],
    ["Everyone is entitled to their own opinion. It's just that yours is stupid."],
    ["Marriage is give and take. You'd better give it to her or she'll take it anyway.", "Joey Adams"],
    ["I have opinions of my own – strong opinions – but I don't always agree with them.", "George Bush"],
    ["When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That's relativity.", "Albert Einstein"],
    ["Duct tape is like the force. It has a light side, a dark side, and it holds the world together."],
    ["He who laughs last didn't get it."],
    ["No, please don't eat me. I have a wife and kids, eat them.", "Homer Simpson"],
    ["I hope I didn't brain my damage...", "Homer Simpson"],
    ["When one person suffers from a delusion it is called insanity; when many people suffer from a delusion it is called religion.", "Robert Pirsig"],
    ["Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.", "Albert Einstein"],
    ["A lie gets halfway around the world before the truth has a chance to get its pants on.", "Sir Winston Churchill"],
    ["Do, or do not. There is no 'try'.", "Yoda"],
    ["C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do, it blows away your whole leg.", "Bjarne Stroustrup"],
    ["I have not failed. I've just found 10,000 ways that won't work.", "Thomas Alva Edison"],
    ["There is no reason anyone would want a computer in their home.", "Ken Olson, founder of Digital Equipment Corp., 1977"],
    ["Who the hell wants to hear actors talk?", "H. M. Warner, founder of Warner Brothers, 1927"],
    ["Everything that can be invented has been invented.", "Charles H. Duell, U.S. Office of Patents, 1899"],
    ["God gave men both a penis and a brain, but unfortunately not enough blood supply to run both at the same time.", "Robin Williams"],
    ["We are not retreating – we are advancing in another direction.", "General Douglas MacArthur"],
    ["It isn't premarital sex if you have no intention of getting married.", "Drew Carey"],
    ["I handed in a script last year and the studio didn't change one word. The word they didn't change was on page 87.", "Steve Martin"],
    ["I believe there would be many people alive today if there were a death penalty.", "Nancy Reagan"],
    ["Oh it's something like spyware, like my stupidly downloaded por... music, my downloaded music.", "Rodney McKay"],
    ["My Mama always said; Life was like a box of chocolates; you never know what you're gonna get.", "Forrest Gump"],
    ["America will never be destroyed from the outside. If we falter and lose our freedoms, it will be because we destroyed ourselves.", "Abraham Lincoln"],
    ["Better to remain silent and be thought a fool than to speak out and remove all doubt.", "Abraham Lincoln"],
    ["What counts is not necessarily the size of the dog in the fight – it's the size of the fight in the dog.", "General Dwight D. Eisenhower"],
];

export default class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: data,
            current: null,
        };
    }

    componentWillMount() {
        if (this.state.quotes) {
            this.refreshQuote();
        }
    }

    refreshQuote() {
        const quote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];

        this.setState({
            current: {
                text: quote[0],
                author: (quote.length > 1 ? quote[1] : null)
            }
        });
    }

    render() {
        return this.state.current ? (
            <div className="pointer" onClick={this.refreshQuote.bind(this)}>
                <div>{this.state.current.text}</div>
                <div className="rightify">{this.state.current.author ? <i>- {this.state.current.author}</i> : null}</div>
            </div>
        ) : null;
    }
}