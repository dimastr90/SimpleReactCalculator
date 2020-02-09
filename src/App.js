import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";

const SomeButtons = (props,k) => {
  return <button
           key={k}
           type="button"
           className={props.style}
           onClick={props.onClick}
           value={props.value}
           >
           {props.value}
        </button>
}


class SimpleCalc extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mainScreen:"0",
      alterScreen:"",
      dotMode:false,
      isSubmit:false
    }
    this.operatorHandler = this.operatorHandler.bind(this);
    this.numbersHandler = this.numbersHandler.bind(this);
    this.calcReset = this.calcReset.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  operatorHandler(e){
    let value = e.target.value;
    let alt = this.state.alterScreen;
    let main = this.state.mainScreen;
    let prev = isNaN(Number(alt[alt.length-1]));
    let secondprev = isNaN(Number(alt[alt.length-2]));


    if(this.state.isSubmit){
      alt="";
      main="0";
    }

    if(!prev){
      main=value;
      alt+=value;
    }else if(secondprev){
      main=value;
      alt=alt.substring(0,alt.length-2)+value;
    }else if(prev){
      alt = alt[alt.length-1]!=="-" && value==="-" ? alt+value : alt.substring(0,alt.length-1)+value;
    }


    this.setState({
      mainScreen: main,
      alterScreen: alt,
      dotMode: false,
      isSubmit: false
    });
  }

  numbersHandler(e){
    let alt = this.state.alterScreen;
    let main = isNaN(Number(this.state.mainScreen[0])) ? "" : this.state.mainScreen;
    let value = e.target.value;
    let add = "";
    let dot = this.state.dotMode;

    if(alt[0]==="X" || alt[0]==="/" || alt[0]==="+") alt=alt.substring(1);

    if(this.state.isSubmit){
      alt="";
      main="0";
    }

    if(value === ".") {
      if(!this.state.dotMode){
        add = ".";
        dot=!dot;
        if(alt==="") alt="0";
      }
    }else if(main === "0"){
      if(value!=="0"){
        main=value;
        alt=value;
      }
    }else add=value;

    this.setState({
      mainScreen: main+add,
      alterScreen: alt+add,
      dotMode: dot,
      isSubmit: false
    });
  }

  submitHandler(){
     let alt = this.state.alterScreen;
      // eslint-disable-next-line
     alt = alt.replace(/[\+\-\/X]*$/,"");
     alt = alt.replace(/X/g,"*");
      // eslint-disable-next-line
     let res = alt.length<1 ? "Error!" : eval(alt);

     this.setState({
      mainScreen: res,
      alterScreen: alt+"="+res,
      isSubmit: true
    });
  }

  calcReset(){
     this.setState({
      mainScreen:"0",
      alterScreen:"",
      dotMode:false,
      isSubmit:false
    });
  }

  getButtons(){
    return [{style:"btn btn-danger ac",onClick:this.calcReset, value:"AC"},
					{style:"btn btn-info", onClick:this.operatorHandler, value:"/"},
					{style:"btn btn-info", onClick:this.operatorHandler, value:"X"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"7"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"8"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"9"},
					{style:"btn btn-info", onClick:this.operatorHandler, value:"-"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"4"},
					{style:"btn btn-light", onClick: this.numbersHandler, value:"5"},
					{style:"btn btn-light", onClick: this.numbersHandler, value:"6"},
					{style:"btn btn-info", onClick:this.operatorHandler, value:"+"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"1"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"2"},
					{style:"btn btn-light", onClick:this.numbersHandler, value:"3"},
					{style:"btn btn-success suc",onClick:this.submitHandler, value:"="},
					{style:"btn btn-light zero",onClick:this.numbersHandler, value:"0"},
					{style:"btn btn-light",onClick:this.numbersHandler, value:"."}];

  }





  render(){
    return(
     <div id="calc">
           <input type="text" value={this.state.alterScreen} id="expression"/>
           <input type="text" value={this.state.mainScreen} id="display" />
           <div id="calcButtons">
              {this.getButtons().map((item, i)=>SomeButtons(item, i))}
          </div>
        <div id="author"><p>Designed and Coded By</p><a href="https://github.com/dimastr90">Dima Stronov</a></div>
     </div>
    )
  }
}


export default SimpleCalc;
