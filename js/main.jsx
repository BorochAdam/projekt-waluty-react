import React from 'react';
import Theader from './theader.jsx';
import Tfooter from './tfooter.jsx';
import Tbody from './tbody.jsx';
import ExchangeValue from './exchangeValue.jsx';
import SelectDay from './selectDay.jsx';
import Header from './header.jsx';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state={
            amount: '',
            option: "buy",
            selectedDay: this.props.todayDate.toISOString().split('T')[0],
            currToChange: 'PLN',
            currToChangeValue: 1,
            currUnit: " "
        }
    }
    checkNumber = () => {
       let positiveAmount = prompt('wartość nie może być mniejsza od zera :(\nwprowadź dodatnią wartość');
        this.setState({
            amount: positiveAmount
        });
    }
    changeEggs = (event)=>{
        this.setState({
            currUnit : event.target.options[event.target.selectedIndex].text,
            currToChangeValue : event.target.value*this.state.currToChangeValue
        })
    }

    checkDate = () =>{
        if (this.state.selectedDay > this.props.todayDate.toISOString().split('T')[0]){
            alert('data nie może być dalsza niż dzisiejsza!');
            this.setState({
        selectedDay : this.props.todayDate.toISOString().split('T')[0]
                          })
        }
        if (this.state.selectedDay < "2002-01-02"){
            alert('data nie może być wcześniejsza niż 2002-01-02!');

            this.setState({
                selectedDay : "2002-01-02"
            })
        }
    }

    changeFormElement = (event)=>{
        //podstawienie wartości valuePln z obiektu tradeCurrencies jako wartość do kursu
        let newValuePln = undefined;
        let newUnit = undefined;
        for (let i =0; i < this.props.tradeCurrencies.length; i++){
            this.props.tradeCurrencies[i].name === event.target.value &&
            (newValuePln = this.props.tradeCurrencies[i].valuePln);

            this.props.tradeCurrencies[i].name === event.target.value &&
            (newUnit = this.props.tradeCurrencies[i].unit);
        }


        this.setState({
            [event.target.id] : event.target.value,
            currToChange: event.target.value,
            currToChangeValue : newValuePln,
            currUnit : newUnit
        })
    }

    changeInput = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })
    };

    radioChange=(event)=>{
        this.setState({
            option:  event.target.value
        })
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <h1>
                        NBP calc
                    </h1>
                    <div className="internalContainer">
                        <SelectDay
                            changeInput={this.changeInput}
                            selectedDay={this.state.selectedDay}
                            tradeCurrencies={this.props.tradeCurrencies}
                            changeFormElement={this.changeFormElement}
                            currToChange={this.state.currToChange}
                            changeEggs={this.changeEggs}
                            todayDate={this.props.todayDate}
                            checkDate={this.checkDate}
                        />
                        <ExchangeValue
                            changeInput = {this.changeInput}
                            amount={this.state.amount}
                            option={this.state.option}
                            radioChange = {this.radioChange}
                            currToChange = {this.state.currToChange}
                            currUnit={this.state.currUnit}
                        />
                        <p className="customDate">Stan na:&nbsp; <span>{this.state.selectedDay}</span></p>
                        <table>
                            <Theader option={this.state.option}/>
                            <Tbody
                                checkNumber = {this.checkNumber}
                                currToChangeValue = {this.state.currToChangeValue}
                                option={this.state.option}
                                amount={this.state.amount}
                                currencies={this.props.currencies}
                                selectedDay = {this.state.selectedDay}
                            />
                            <Tfooter/>
                        </table>
                    </div>
                </div>
                <span className="author">Adam Boroch 2018</span>
            </div>


        );
    }
}

