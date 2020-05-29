import React, { Component } from "react";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";

export class AppContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myScore: 0,
      gameOptions: [],
      gameQuestionText: "",
      startTime: new Date().toLocaleTimeString(),
      timeElapsed: new Date().toLocaleTimeString(),
    };
    this.updateTimer = this.updateTimer.bind(this);
    this.generateQuestion = this.generateQuestion.bind(this);
  }

  componentDidMount() {
    this.generateQuestion();
    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {}

  updateTimer = () => {
    var currentTime = this.state.timeElapsed;
    this.setState({ timeElapsed: currentTime });
    // console.log("tick");
  };

  randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  generateQuestion = () => {
    let mathTask = ["add", "sub", "mul", "div"];
    var gameAnswer = 0;
    var questionText = "";
    let randomNumberOne = this.randomNumber(50, 100);
    let randomNumberTwo = this.randomNumber(1, 49);
    randomNumberOne = Math.max(randomNumberOne, randomNumberTwo);
    randomNumberTwo = Math.min(randomNumberOne, randomNumberTwo);
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
        gameAnswer = randomNumberOne + randomNumberTwo;
        break;
      case "sub":
        questionText =
          "What is " + randomNumberOne + " minus " + randomNumberTwo + "?";
        gameAnswer = randomNumberOne - randomNumberTwo;
        break;
      case "mul":
        questionText =
          "What is " +
          randomNumberOne +
          " multiplied by " +
          randomNumberTwo +
          "?";
        gameAnswer = randomNumberOne * randomNumberTwo;
        break;
      case "div":
        questionText =
          "What is " + randomNumberOne + " divided by " + randomNumberTwo + "?";
        gameAnswer = randomNumberOne / randomNumberTwo;
        break;
      default:
        questionText = "There was an error, please refresh and try again!";
    }
    this.setState({ gameQuestionText: questionText });
    this.generatePossibeSolutions(gameAnswer);
  };

  generatePossibeSolutions = (solution) => {
    let optionValues = [];
    optionValues[0] = solution;
    optionValues[1] = solution + this.randomNumber(1, 4);
    optionValues[2] = solution + this.randomNumber(5, 6);
    optionValues[3] = solution + this.randomNumber(7, 9);
    this.setState({ gameOptions: optionValues });
    // TODO: handle duplicate values
    this.shuffleOptions(this.state.gameOptions);
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
    return (
      // "Your Final Score is " + this.state.timeElapsed / this.state.myScore + ""
      console.log(this.myScore)
    );
  };

  render() {
    return (
      <div className="container">
        <Row className="gameStats">
          <Col>
            <p className="timerClock">Time: {this.state.timeElapsed}</p>
          </Col>
          <Col>
            <p className="gameScore">Score: {this.state.myScore}</p>
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
