import React, { Component } from "react";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";

export class AppContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameScore: 0,
      gameOptions: [],
      gameAnswer: 0,
      gameQuestionText: "",
      gameTime: 0,
    };
  }

  componentDidMount() {
    this.generateQuestion();
  }

  randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  generateQuestion = () => {
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
        questionText =
          "What is the sum of " +
          randomNumberOne +
          " and " +
          randomNumberTwo +
          "?";
        getAnswer = randomNumberOne + randomNumberTwo;
        break;
      case "sub":
        questionText =
          "What is " + randomNumberOne + " minus " + randomNumberTwo + "?";
        getAnswer = randomNumberOne - randomNumberTwo;
        break;
      case "mul":
        questionText =
          "What is " +
          randomNumberOne +
          " multiplied by " +
          randomNumberTwo +
          "?";
        getAnswer = randomNumberOne * randomNumberTwo;
        break;
      case "div":
        questionText =
          "What is " + randomNumberOne + " divided by " + randomNumberTwo + "?";
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
    var selectedOption = Number(e.target.innerHTML);
    if (selectedOption === this.state.gameAnswer) {
      this.updateScore(selectedOption);
      alert("Congratulations! that is correct");
    } else {
      alert("Wrong, please try again!");
    }
    this.generateQuestion();
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
                variant="warning"
                size="lg"
                onClick={this.handleClick}
                block
              >
                {this.state.gameOptions[i]}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default AppContent;
