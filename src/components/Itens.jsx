import React, { Component } from 'react'
import Item from './Item'
import PubSub from 'pubsub-js'

export default class Itens extends Component{


    constructor(props){
        super(props)

        this.state = {
            atributos: props.atributos,
            json: props.json,
            lista: [],
            isValid: [],
        }
    }



    componentDidMount(){
    
        // var listagem = []
        // for(var i =0; i<this.state.atributos.length;i++){
        //     console.log(i)
        //     PubSub.subscribe('VALID_FORM_'+i, (index,values)=> {
        //         console.log(values)
        //     });
        //     //     var key = index;
            
        //     // var data = {
        //     //     [key]: values
        //     // }
    
        //     //     listagem.push(data)
        
        //     // });
        // }
        // console.log(listagem)
    }

    render(){

        var item = []

        for(let i = 0; i<this.state.atributos.length;i++){
          item.push(
                  <Item validarCampo={(obj)=> this.validarCampo(obj[0], obj[1],obj[2],obj[3])} key={i} data={this.state.json} atrib={this.state.atributos} index={i}/>
              );
        }
    
        return(
            <div style ={{'flexDirection': "row",justifyContent:'space-between','display':"flex"}}>
                {item}
            </div>
            
        ) 
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
        lista = this.state.lista;
        lista.push(json)
        
     console.log(lista)
        
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