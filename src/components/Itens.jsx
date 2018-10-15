import React, { Component } from 'react'
import Item from './Item'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default class Itens extends Component{


    constructor(props){
        super(props)

        this.state = {
            atributos: props.atributos,
            json: props.json,
            listaComponentes: [],
            listaInputs: [],
            isValid: [],
            exportValid: true,
            count: 0
        }

        this.onChangeSelectFromChildren = this.onChangeSelectFromChildren.bind(this)
        this.MudarState = this.MudarState.bind(this)
        this.ExportToJson = this.ExportToJson.bind(this)
        
    }

    MudarState(e){
        this.setState({
            exportValid:e
        })
    }

    onChangeInputChildren(e){

    }

    onChangeSelectFromChildren(valueSelect){
        var teste = (valueSelect.isValid)
       
        var isValido = this.state.listaComponentes;
        isValido[valueSelect.indexComponente] = valueSelect.isValid
       
        this.setState({
            listaComponentes: isValido
        })
        
    }

    onClickButtonExport(){
        this.state.count = 0;
        for(let j =0; j< this.state.atributos.length;j++){
            for(let i =0; i<= this.state.qtInput;i++){
                if(this.state.listaComponentes[j][i].valid==false){
                    this.state.count++
                }
                
            }
        }

        if(this.state.count == 0){
            this.setState({
                valid:true
            })
        }else{
            this.setState({
                valid:false
            })
        }
        this.setState({
            open:true
        })

    }
 

    render(){
        
        var item = []

        for(let i = 0; i<this.state.atributos.length;i++){
          item.push(
                  <Item onChangeSelect={(e)=> this.onChangeSelectFromChildren(e)} onChangeInputChildren={(e)=>this.onChangeInputChildren(e)} validarCampo={(obj)=> this.validarCampo(obj[0], obj[1],obj[2],obj[3],obj[4])} key={i} data={this.state.json} atrib={this.state.atributos} index={i}/>
              );
        }
    
        return(
            
            <div>
                <div style ={{'flexDirection': "row",justifyContent:'space-between','display':"flex"}}>
                    {item}
                
                </div>
                <div>
                    <Button style={{margin:5}} variant="outlined" color="inherit" onClick={() => this.onClickButtonExport()}>
                        Exportar
                    </Button>
                </div>
                    <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.valid ? 'Selecione uma opção para exportar: ':'Campos inválidos, por favor verifique os campos para continuar'}</span>}
            action={this.state.valid ? ([
                <Button key="undo" color="secondary" size="small" onClick={this.ExportToJson}>
                JSON
                </Button>,
                <Button key="undo" color="secondary" size="small" onClick={this.ExportToExcel}>
                Excel
                </Button>,
                 <Button key="undo" color="secondary" size="small" onClick={()=> this.setState({open:false})}>
                 Fechar
                 </Button>
            ]): ([
                <Button key="undo" color="secondary" size="small" onClick={()=> this.setState({open:false})}>
                Fechar
                </Button>
            ])

                
        }
            />
               
                
            </div>
            
        ) 
    }

    ExportToJson(){
        const download = require('downloadjs')
        download(JSON.stringify(this.state.json),"json.txt","text/plain")
    }

    ExportToExcel(){
        
    }

    exportToJson(objectData) {
        let filename = "export.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
          navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          var a = document.createElement('a');
          a.download = filename;
          a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
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
        if(comp.length == 0){
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