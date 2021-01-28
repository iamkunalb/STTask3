import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import kata from '../img/Katalyst.jpg';
import bay from '../img/Bayside Club.jpg';
import abc from '../img/ABC Goods Ltd.jpg';

import kataJson from '../json/Katalyst.json';
import bayJson from '../json/Bayside Club.json';
import abcJson from '../json/ABC Goods Ltd.json';

import ReactTooltip from 'react-tooltip';
const Boundingbox = require('react-bounding-box');

const options = [
  'Katalyst', 'Bayside Club', 'ABC Goods Ltd'
];

class App extends React.Component<any,any> {
  constructor(props: any){
    super(props);
    this.state = {
      image: kata,
      conf: [],
      name: [],
      text: [],
      fName: "",
      fConf: "",
      fText: "",
      index: 0,
      readResBB: [],
      newConf: [],
      newText: [],
      readRes: [],
      enteredName: ""
    }
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
  }

  _onMouseMove(e: any) {
    if(this.state.fName == ""){
      ReactTooltip.hide()
    }
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let data = '';
    let conf = '';
    let text = '';
    this.params.boxes.map((dd, ind)=>{
      this.state.readResBB.map((rB:any, rInd:any)=>{
        if (!this.state.readResBB.includes(dd)){
          if ((x >= dd[0]) && (y >= dd[1]) && (x <= (dd[0] + dd[2])) && (y <= (dd[1] + dd[3]))){
            data = this.state.name[ind];
            conf = this.state.conf[ind]
            text = this.state.text[ind];
          }
        }else{
          if(rB == dd){
            if ((x >= rB[0]) && (y >= rB[1]) && (x <= (rB[0] + rB[2])) && (y <= (rB[1] + rB[3])) && (x >= dd[0]) && (y >= dd[1]) && (x <= (dd[0] + dd[2])) && (y <= (dd[1] + dd[3]))){
              data = this.state.enteredName;
              conf = this.state.readRes[rInd].confidence
              text = this.state.readRes[rInd].text;
            }
          }
        }
        this.setState({
          fName: data,
          fConf: conf,
          fText: text,
        })
      })

      
    });
  }

  params = {
    image: '',
    boxes: [
      [1]
    ],
    options: {
      colors: {
        normal: 'rgba(0,0,0,1)',
        selected: 'rgba(66, 182, 245,1)',
        unselected: 'rgba(0,0,0,1)'
      },
      style: {
      }
    }
  };

  change(e: any){
    if (e.value === "Katalyst"){
      this.setState({
        image: kata,
      })
      this.params.image = kata;
      this.params.boxes = [];
      kataJson.analyzeResult.documentResults.map((data) => {
        let list = [''];
        list = [];
        Object.keys(data.fields).map((ob) => {
          list.push(ob)
        })
        this.setState({
          name: list,
          fields: data.fields
        })
        type K = keyof typeof data.fields;
        list.forEach((i) => {
          this.state.conf.push(data.fields[i as K].confidence)
          this.state.text.push(data.fields[i as K].text)
          let BB = [];
          let bb0 = data.fields[i as K].boundingBox[0];
          let bb1 = data.fields[i as K].boundingBox[1];
          let bb2 = data.fields[i as K].boundingBox[2] - data.fields[i as K].boundingBox[0];
          let bb3 = data.fields[i as K].boundingBox[5] - data.fields[i as K].boundingBox[3];
          BB.push(bb0);
          BB.push(bb1);
          BB.push(bb2);
          BB.push(bb3);
          this.params.boxes.push(BB);
        })
      })

      kataJson.analyzeResult.readResults.map((data) => {
        data.lines.map((l) => {
          l.words.map(w => {
            console.log(w)
            this.state.conf.push(w.confidence)
            this.state.text.push(w.text)
            this.state.readRes.push(w)
            let boundB = [];
            boundB.push(w.boundingBox[0])
            boundB.push(w.boundingBox[1])
            boundB.push(w.boundingBox[2] - w.boundingBox[0])
            boundB.push(w.boundingBox[5] - w.boundingBox[3])
            this.state.readResBB.push(boundB)
          })
        })      
      })
    }
    if (e.value === 'Bayside Club'){
      this.setState({
        image: bay
      })
      this.params.image = bay;
      this.params.boxes = [];
      bayJson.analyzeResult.documentResults.map((data) => {
        let list = [''];
        list = [];
        Object.keys(data.fields).map((ob) => {
          list.push(ob)
        })
        this.setState({
          name: list,
          fields: data.fields
        })
        type K = keyof typeof data.fields;
        list.forEach((i) => {
          this.state.conf.push(data.fields[i as K].confidence)
          this.state.text.push(data.fields[i as K].text)
          let BB = [];
          let bb0 = data.fields[i as K].boundingBox[0];
          let bb1 = data.fields[i as K].boundingBox[1];
          let bb2 = data.fields[i as K].boundingBox[2] - data.fields[i as K].boundingBox[0];
          let bb3 = data.fields[i as K].boundingBox[5] - data.fields[i as K].boundingBox[3];
          BB.push(bb0);
          BB.push(bb1);
          BB.push(bb2);
          BB.push(bb3);
          this.params.boxes.push(BB);
        })
      })
      
      bayJson.analyzeResult.readResults.map((data) => {
        data.lines.map((l) => {
          l.words.map(w => {
            console.log(w)
            this.state.conf.push(w.confidence)
            this.state.text.push(w.text)
            this.state.readRes.push(w)
            let boundB = [];
            boundB.push(w.boundingBox[0])
            boundB.push(w.boundingBox[1])
            boundB.push(w.boundingBox[2] - w.boundingBox[0])
            boundB.push(w.boundingBox[5] - w.boundingBox[3])
            this.state.readResBB.push(boundB)
          })
        })      
      })
    }
    if (e.value === 'ABC Goods Ltd'){
      this.setState({
        image: abc
      })
      this.params.image = abc;
      this.params.boxes = [];
      abcJson.analyzeResult.documentResults.map((data) => {
        let list = [''];
        list = [];
        Object.keys(data.fields).map((ob) => {
          list.push(ob)
        })
        this.setState({
          name: list,
          fields: data.fields
        })
        type K = keyof typeof data.fields;
        list.forEach((i) => {
          this.state.conf.push(data.fields[i as K].confidence)
          this.state.text.push(data.fields[i as K].text)
          let BB = [];
          let bb0 = data.fields[i as K].boundingBox[0];
          let bb1 = data.fields[i as K].boundingBox[1];
          let bb2 = data.fields[i as K].boundingBox[2] - data.fields[i as K].boundingBox[0];
          let bb3 = data.fields[i as K].boundingBox[5] - data.fields[i as K].boundingBox[3];
          BB.push(bb0);
          BB.push(bb1);
          BB.push(bb2);
          BB.push(bb3);
          this.params.boxes.push(BB);
        })
      })
      abcJson.analyzeResult.readResults.map((data) => {
        data.lines.map((l) => {
          l.words.map(w => {
            console.log(w)
            this.state.conf.push(w.confidence)
            this.state.text.push(w.text)
            this.state.readRes.push(w)
            let boundB = [];
            boundB.push(w.boundingBox[0])
            boundB.push(w.boundingBox[1])
            boundB.push(w.boundingBox[2] - w.boundingBox[0])
            boundB.push(w.boundingBox[5] - w.boundingBox[3])
            this.state.readResBB.push(boundB)
          })
        })      
      })
    }
  }

  click(e: any){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    this.state.readResBB.map((rB:any)=>{
      if (((x >= rB[0]) && (y >= rB[1]) && (x <= (rB[0] + rB[2])) && (y <= (rB[1] + rB[3])))){
        if (!this.params.boxes.includes(rB)){
          this.params.boxes.push(rB)
        }else{
          this.params.boxes.splice(this.params.boxes.indexOf(rB), 1)
        }
      }else{
        this.state.name.forEach((el: any, index: any) => {
          if (this.state.fName !== ""){
            if (this.state.fName === el){
              this.params.boxes.splice(index, 1)
            }
          }
        })
      }
    })
    let enteredName = this.state.fName;
    if (enteredName === ""){
      const eName = prompt('Please enter Field Name')
      enteredName = eName!;
    }
    this.setState({
      enteredName: enteredName
    })

  }

  render(){
    return (
      <div className="App">
          <Dropdown options={options} placeholder="Select an Invoice" onChange={this.change}/>
          <div data-tip onMouseMove={this._onMouseMove.bind(this)} onClick={this.click}>
            <Boundingbox image={this.params.image}
                        boxes={this.params.boxes}
                        options={this.params.options}/>
            <ReactTooltip effect="float">
            <span>
              Field Name: {this.state.fName}
              <br/>
              Confidence: {this.state.fConf}
              <br/>
              Text: {this.state.fText}
              <br/>
              Click to delete Mapping
            </span>
            </ReactTooltip>
          </div>
          {/* <View></View> */}
      </div>
    );
  }
}

export default App;
