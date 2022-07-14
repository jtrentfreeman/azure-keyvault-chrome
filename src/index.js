import React from "react";
import ReactDOM from "react-dom";
import * as msal from "@azure/msal-browser";

import { Image } from "react-bootstrap";

import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      title: "Unknown",
      link: "",
    };

    this.fetchPost = this.fetchPost.bind(this);
  }

  componentDidMount() {
    this.fetchPost();
    console.log(this.state.imageURL);
    this.login();
  }

  async login() {
    const msalConfig = {
      auth: {
        clientId: "cd9a9a8e-dc07-4180-9ecb-122c5549a5e4",
      },
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);
    try {
      const loginResponse = await msalInstance.acquireTokenSilent();
      console.log(loginResponse);
    } catch (err) {
      console.log(err);
    }

    console.log("logged in");
    const myAccounts = msalInstance.getAllAccounts();
    console.log(msalInstance.getAccountByUsername("jtrentfreeman@gmail.com"));
    console.log(myAccounts);
  }

  fetchPost = (subreddit) => {
    fetch("https://old.reddit.com/r/dalle2/random/.json", {
      method: "GET",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let media_metadata = data[0].data.children[0].data.url;
        let title = data[0].data.children[0].data.title;
        let link =
          "https://reddit.com/" + data[0].data.children[0].data.permalink;
        this.setState({
          imageURL: media_metadata,
          title,
          link,
        });
      });
  };

  displayImage = () => {
    return (
      <React.Fragment>
        <h2>{this.state.title}</h2>
        <Image className="mainImage" src={this.state.imageURL} />
        <a href={this.state.link}>Link to post</a>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="App">
        <h1> Hello, reactttt</h1>
        {this.displayImage()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
