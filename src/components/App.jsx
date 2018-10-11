import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import Dropzone from 'react-dropzone'
import csv from 'csv'
import Itens from './Itens'

import ButtonExport from './ButtonExport'



class App extends Component {

constructor(props){
  super(props);
  this.state = {
   json: {},
   atributos: [],
   controlDropZone: true,
   lista: []
  }  
}



  render() {
    return (
      <div>
        
        {
          this.state.controlDropZone ? (<Dropzone onDrop={this.onDrop.bind(this)}></Dropzone>):(null)
        }
        
       

        {
          this.state.atributos.length > 0 ? (
          
          <div style ={{'flexDirection': "row",justifyContent:'space-between','display':"flex"}}>
         
          <Itens json={this.state.json} atributos={this.state.atributos}/> 
          <ButtonExport />
          </div>
          
        ):(null)
        }
    
        
        
      

      </div>
    );
  }

onDrop = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        csv.parse(reader.result, (err, data) => {
          
          var primeiraLinha = data[0][0].split(';')
         // primeiraLinha.pop();

          var tamanhoLinhas = data.length;
          var tamanhoColunas = primeiraLinha.length;

          var objPai = {}
          objPai['obj'] = []
          var objAux = {}

          for(var i = 1; i < tamanhoLinhas;i++){
            
            for(var j = 0; j<tamanhoColunas;j++){

              var a = data[i][0].split(';');
              objAux[primeiraLinha[j]] = a[j]
              

            }
            objPai['obj'].push(objAux);
            objAux = {}
            
          }

          this.setState({
            json : objPai['obj'],
            atributos : primeiraLinha,
            controlDropZone : false

          });

        });
    };

    reader.readAsBinaryString(e[0]);
}


csvJSON(csv){
  return JSON.stringify(csv); 
}

  
}

export default App;
