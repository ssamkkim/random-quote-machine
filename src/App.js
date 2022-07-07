import './App.scss';
import React from 'react';
import { FaTwitter, FaRandom } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { quote: "", author: ""};
  }
 componentWillMount() {
    this.handleSubmit();
  }
  render() {
    const tweetQuote = this.state.quote.replace(" ", "%20")
    const authorQuote = this.state.author.replace(" ", "%20")
    const tweetLink = "https://twitter.com/intent/tweet?text=\"" + tweetQuote + "\" -" + authorQuote;
    return (
        <div className="App" id="quote-box">
          <p id="text">{this.state.quote}</p>
          <h4 id="author">- {this.state.author}</h4>
          <div className="bottom-container">
            <a id="tweet-quote" href={tweetLink} target="_blank" rel="noopener noreferrer"><FaTwitter className="icon" id="twitter"/></a>
            <button id="new-quote" onClick={this.handleSubmit}><FaRandom className="icon" id="random"/></button>
          </div>
        </div>
    );
  }
  async handleSubmit() {
    try {
      const quotes = await fetch("https://api.quotable.io/random");
      const response = await quotes.json();
      this.setState({
        quote: response.content,
        author: response.author
      })
    } catch(error) {
      console.log(error);
    }
  }
}

export default App;
