import React, { Component } from 'react';
import PubSub from 'pubsub-js'


export default class Item extends React.Component {

constructor(props){
    super(props);  
    this.state = {
        data : props.data,
        index: props.index,
        atrib: props.atrib,
        valSelect:"0", 
        isValid: [],

        
    }   
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
}




    render(){
        
        const css = {
            has_error:{
                borderColor:'red',
                marginTop:4
            },
            has_sucess:{
                borderColor:'green',
                marginTop:4
            }
            
        };

        
        var item = []           
        
        for (let i = 0; i < this.state.data.length; i++) {
        
            var json = {
                0:i,
                1:this.state.data[i][this.state.atrib[this.state.index]],
                2: this.state.valSelect,
                3: this.state.index
            }
            this.props.validarCampo(json)
            this.validarCampo(i, this.state.data[i][this.state.atrib[this.state.index]], this.state.valSelect, this.state.index)

            
            item.push(
                <div>
                    
                        
                    <input className="form-control" style={this.state.isValid[i]['valid'] ? css.has_sucess:css.has_error} value={this.state.data[i][this.state.atrib[this.state.index]]} onChange={(e)=>this.handleChangeInput(e, i)}/>
    
                
                </div>
            );
        }
        PubSub.publish('VALID_FORM_'+this.state.index,this.state.isValid)
        
        
       
        return (
                    <div style={{display:'flex', flexDirection:'column'}}>
                        
                        <select onChange={(e)=>this.handleChangeSelect(e, this.state.index)}
                        value={this.state.valSelect}
                        className="form-control">
                            <option value="0">Tudo</option>
                            <option value="1">Texto</option>
                            <option value="2">Numeros</option>
                            <option value="3">CPF</option>
                            <option value="4">Data</option>
                        </select>

                        <label>{this.state.atrib[this.state.index]}</label>
                        
                     
                        {item}
                        
                       

                    </div>
            
        ); 
    }

    

    
   

    handleChangeInput(e, index){
        var value = e.target.value
        var json = this.state.data; 

        json[index][this.state.atrib[this.state.index]] = value
        this.setState({
            data:json
        }) 
    }

    handleChangeSelect(e,index){
        var value = e.target.value;

        this.setState({
            valSelect: value
        })

    }

    validarCampo(indexInput, valInput, select, indexComponente, lista){
        var json = {}
        var lista = []

        if(select=="0"){
            json = {
                id: indexInput,
                valid:this.ValidarNull(valInput),
                indexComponente: indexComponente
            }
           this.state.isValid[indexInput] = json 
        }
        if(select=="1"){
            json = {
                id: indexInput,
                valid:this.ValidarTexto(valInput),
                indexComponente: indexComponente,
                msg:"Campo inválido - Text only"
            }
           this.state.isValid[indexInput] = json 
        }

        if(select=="2"){
            json = {
                id: indexInput,
                valid:this.ValidarNumeros(valInput),
                indexComponente: indexComponente,
                msg:"Campo inválido - Number only" 
            }
           this.state.isValid[indexInput] = json 
        }

        if(select=="3"){
            json = {
                id: indexInput,
                valid:this.ValidarCPF(valInput),
                indexComponente: indexComponente,
                msg:"CPF inválido - (Verificar regra)"
            }
           this.state.isValid[indexInput] = json 
        }

        if(select=="4"){
            json = {
                id: indexInput,
                valid:this.ValidarData(valInput),
                indexComponente: indexComponente,
                msg:"Data inválida - (Verificar regra)"
            }
           this.state.isValid[indexInput] = json 
        }
        
    }


    ValidarNull(texto){
        return texto == "" ? false:true
    }

    ValidarTexto(texto){
        
        var er = /^[a-zA-Z]+$/;
       
        return (er.test(texto));
          
    }

    ValidarNumeros(texto){
        var er = /^[0-9]+$/;
       
        return (er.test(texto));
    }

    ValidarCPF(texto){
        texto = texto.replace(".","")
        texto = texto.replace(".","")
        texto = texto.replace("-","")
        return this.validaCPF(texto);

    }

    ValidarData(texto){
       
        return false
        //Depende de como você quer
    }

    validaCPF(cpf){

        if (typeof(cpf) == "string"){
            cpf.replace(".","");
            cpf.replace("-","");
        }

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) !== cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
    }
  
    

}

