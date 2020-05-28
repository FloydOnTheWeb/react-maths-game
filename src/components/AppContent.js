import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'react-bootstrap';

export class AppContent extends Component {
constructor(props) {
    super(props)

    this.state = {
        myScore: 0,
        gameOptions:[0,0,0,0],
        timeElapsed: new Date().toLocaleTimeString()
    }
}

randomNumber = (min,max) =>{ return Math.round( Math.random() * (max - min) + min);}

generateQuestion = () => {
    let mathTask = ['add','sub','mul','div']; var gameAnswer= 0; let questionText = '';
    let randomNumberOne = this.randomNumber(50,100); let randomNumberTwo = this.randomNumber(1,49);
    randomNumberOne = Math.max(randomNumberOne,randomNumberTwo);
    randomNumberTwo = Math.min(randomNumberOne,randomNumberTwo);
    let showQuestion = mathTask[Math.floor(Math.random() * mathTask.length)];
    if((showQuestion == 'div') && ((randomNumberOne % randomNumberTwo) !== 0)){ showQuestion ='add'};
    // TODO:check above condition
    // console.log(showQuestion);
    switch(showQuestion){
        case 'add': questionText = 'What is the sum of '+ randomNumberOne +' and '+ randomNumberTwo +'?';
        gameAnswer = (randomNumberOne + randomNumberTwo) ;break;
        case 'sub': questionText = 'What is '+ randomNumberOne +' minus '+ randomNumberTwo +'?';
        gameAnswer = (randomNumberOne - randomNumberTwo) ;break;
        case 'mul': questionText = 'What is '+ randomNumberOne +' multiplied by '+ randomNumberTwo +'?';
        gameAnswer = (randomNumberOne * randomNumberTwo) ;break;
        case 'div': questionText = 'What is '+ randomNumberOne +' divided by '+ randomNumberTwo +'?';
        gameAnswer = (randomNumberOne / randomNumberTwo) ;break;
        default:  questionText = 'There was an error, please refresh and try again!';
    }
    this.generatePossibeSolutions(gameAnswer);
    return questionText;
}

generatePossibeSolutions = (solution) => {
    this.state.gameOptions[0] = solution;
    this.state.gameOptions[1] = solution + this.randomNumber(1,4);
    this.state.gameOptions[2] = solution + this.randomNumber(4,6);
    this.state.gameOptions[3] = solution + this.randomNumber(7,9);
    // TODO:handle duplicate values
    this.shuffleOptions(this.state.gameOptions);
    return this.gameOptions;
}

shuffleOptions = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

finalScore = () => {
    return 'Your Final Score is '+ (this.state.timeElapsed / this.state.myScore) + '';
}

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
                    <p>{this.generateQuestion()}</p>
                    </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col><Button className="gameOption" variant="warning" size="lg" block>{this.state.gameOptions[0]}</Button></Col>
                    <Col><Button className="gameOption" variant="warning" size="lg" block>{this.state.gameOptions[1]}</Button></Col>
                    <Col><Button className="gameOption" variant="warning" size="lg" block>{this.state.gameOptions[2]}</Button></Col>
                    <Col><Button className="gameOption" variant="warning" size="lg" block>{this.state.gameOptions[3]}</Button></Col>
                    {/* TODO:Use map to populate */}
                </Row>
            </div>
        )
    }
}

export default AppContent
