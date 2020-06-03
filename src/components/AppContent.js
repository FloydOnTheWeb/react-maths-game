import React, { Component } from "react";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";

export class AppContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameQuestionText: "",
      gameOptions: [],
      optionColour: "warning",
      gameAnswer: 0,
      gameScore: 0,
      gameResult: false,
    };
  }

  componentDidMount() {
    this.generateQuestion();
  }

  randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  generateQuestion = () => {
    this.setState({ gameResult: false });
    this.setState({ optionDisplay: true });
    this.setState({ optionColour: "warning" });
    let mathTask = ["add", "sub", "mul", "div"];
    var getAnswer = 0;
    var questionText = "";
    let randomNumberOne = this.randomNumber(50, 100);
    let randomNumberTwo = this.randomNumber(1, 49);
    let showQuestion = mathTask[Math.floor(Math.random() * mathTask.length)];
    if (showQuestion === "div" && randomNumberOne % randomNumberTwo !== 0) {
      showQuestion = "add";
    }
    switch (showQuestion) {
      case "add":
        questionText = `What is the sum of ${randomNumberOne} and ${randomNumberTwo}?`;
        getAnswer = randomNumberOne + randomNumberTwo;
        break;
      case "sub":
        questionText = `What is ${randomNumberOne} minus ${randomNumberTwo}?`;
        getAnswer = randomNumberOne - randomNumberTwo;
        break;
      case "mul":
        questionText = `What is ${randomNumberOne} multiplied by ${randomNumberTwo}?`;
        getAnswer = randomNumberOne * randomNumberTwo;
        break;
      case "div":
        questionText = `What is ${randomNumberOne} divided by ${randomNumberTwo}?`;
        getAnswer = randomNumberOne / randomNumberTwo;
        break;
      default:
        questionText = "There was an error, please refresh and try again!";
    }
    this.setState({ gameAnswer: getAnswer });
    this.setState({ gameQuestionText: questionText });
    this.generatePossibeSolutions(getAnswer);
  };

  generatePossibeSolutions = (solution) => {
    let optionValues = [];
    optionValues[0] = solution;
    optionValues[1] = solution + this.randomNumber(1, 4);
    optionValues[2] = solution + this.randomNumber(5, 6);
    optionValues[3] = solution + this.randomNumber(7, 9);
    this.shuffleOptions(optionValues);
    this.setState({ gameOptions: optionValues });
  };

  shuffleOptions = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  updateScore = () => {
    this.setState({ gameScore: this.state.gameScore + 1 });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ optionDisplay: false });
    var selectedOption = Number(e.target.value);
    if (selectedOption === this.state.gameAnswer) {
      this.updateScore(selectedOption);
      this.setState({ gameResult: true });
      this.setState({ gameOptions: ["G", "O", "O", "D"] });
      this.setState({ optionColour: "success" });
    } else {
      this.setState({ gameResult: false });
      this.setState({ gameOptions: ["N", "O", "P", "E"] });
      this.setState({ optionColour: "danger" });
    }
  };

  render() {
    return (
      <div className="container">
        <Row className="gameStats">
          <Col>
            <p className="gameScore">Score: {this.state.gameScore}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron className="gameQuestion">
              <p>{this.state.gameQuestionText}</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {this.state.gameOptions.map((item, i) => (
            <Col key={i}>
              <Button
                id={i}
                className="gameOption"
                variant={this.state.optionColour}
                size="lg"
                value={this.state.gameOptions[i]}
                onClick={this.handleClick}
                disabled={!this.state.optionDisplay}
                block
              >
                {this.state.gameOptions[i]}
              </Button>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <div className="message">
              <div>
                <Button
                  onClick={this.generateQuestion}
                  disabled={this.state.optionDisplay}
                  variant="warning"
                >
                  Next
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AppContent;
