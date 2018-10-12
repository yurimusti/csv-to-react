import React, { Component } from 'react'
import Item from './Item'
import Button from '@material-ui/core/Button';



export default class Itens extends Component{


    constructor(props){
        super(props)

        this.state = {
            atributos: props.atributos,
            json: props.json,
            listaComponentes: [],
            listaInputs: [],
            isValid: [],
            exportValido:false
        }
    }

    teste(e){
        
        console.log(this.state.listaComponentes)
        //this.ValidarExportButton(this.state.json.length)
        
    }

    // componentDidMount(){
        
    //     if(this.ValidarExportButton(this.state.qtInput)==0){
    //         this.setState({
    //             exportValido: true
    //         })
    //     }else{
    //         this.setState({
    //             exportValido:false
    //         })
    //     }
    // }

    onChangeSelectFromChildren(valueSelect, indexComponente){

    }

 

    render(){


       

        var item = []

        for(let i = 0; i<this.state.atributos.length;i++){
          item.push(
                  <Item onChangeSelect={(e)=> this.onChangeSelectFromChildren(e[0], e[1])} funcaoteste={(e)=>this.teste(e)} validarCampo={(obj)=> this.validarCampo(obj[0], obj[1],obj[2],obj[3],obj[4])} key={i} data={this.state.json} atrib={this.state.atributos} index={i}/>
              );
        }
    
        return(
            <div>
                <div style ={{'flexDirection': "row",justifyContent:'space-between','display':"flex"}}>
                    {item}
                
                </div>
                <div>
                    {
                        this.state.exportValido ? (
                            <Button variant="outlined" color="secundary">
                                Exportar
                            </Button>
                    ) : (null)}
                </div>
               
                
            </div>
            
        ) 
    }



    validarCampo(indexInput, valInput, select, indexComponente, qtInput){
        var json = {}

        if(select=="0"){
            json = {
                id: indexInput,
                valid:this.ValidarNull(valInput),
                indexComponente: indexComponente
            }
          
        }
        if(select=="1"){
            json = {
                id: indexInput,
                valid:this.ValidarTexto(valInput),
                indexComponente: indexComponente,
                msg:"Campo inválido - Text only"
            }
         
        }

        if(select=="2"){
            json = {
                id: indexInput,
                valid:this.ValidarNumeros(valInput),
                indexComponente: indexComponente,
                msg:"Campo inválido - Number only" 
            }
          
        }

        if(select=="3"){
            json = {
                id: indexInput,
                valid:this.ValidarCPF(valInput),
                indexComponente: indexComponente,
                msg:"CPF inválido - (Verificar regra)"
            }
           
        }

        if(select=="4"){
            json = {
                id: indexInput,
                valid:this.ValidarData(valInput),
                indexComponente: indexComponente,
                msg:"Data inválida - (Verificar regra)"
            }
           
        }

        var comp = this.state.listaComponentes
        // var listaComponentes = this.state.listaComponentes;
        // var listaInputs = this.state.listaInputs;
        if(indexComponente==0 && indexInput==0){ 
            for(let i = 0; i< this.state.atributos.length;i++){
                var arr = []               
                comp[i] = arr
                for(let j = 0; j<= qtInput ;j++){
                    var teste = {};
                    
                    comp[i][j] = teste
                }
            }
        }
        comp[indexComponente][indexInput] = json

        this.state.listaComponentes = comp  
        this.state.qtInput = qtInput;
          
    }

    ValidarExportButton(qtInput){
        var lista = this.state.listaComponentes;
        var count = 0;
        for(let i = 0; i< this.state.atributos.length;i++){
            for (let j = 0; j < qtInput; j++) {
                if(lista[i][j]['valid'] == false){
                    count++
                }
            }
        }
        return count;
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