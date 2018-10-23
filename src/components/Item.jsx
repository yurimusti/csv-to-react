import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';


export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: props.index,
      atrib: props.atrib,
      valSelect: "0",
      isValid: []
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  render() {
    const { classes } = this.props;

    const ranges = [
      {
        value: "0",
        label: "Tudo"
      },
      {
        value: "1",
        label: "Texto"
      },
      {
        value: "2",
        label: "Numeros"
      },
      {
        value: "3",
        label: "CPF"
      },
      {
        value: "4",
        label: "Data"
      }
    ];

    var item = [];

    for (let i = 0; i < this.state.data.length; i++) {
      this.state.valid0 = i;
      this.state.valid1 = this.state.data[i][
        this.state.atrib[this.state.index]
      ];
      this.state.valid2 = this.state.valSelect;
      this.state.valid3 = this.state.index;
      this.state.valid4 = this.state.data.length - 1;

      var jsonValidar = {
        0: i,
        1: this.state.data[i][this.state.atrib[this.state.index]],
        2: this.state.valSelect,
        3: this.state.index,
        4: this.state.data.length - 1
      };

      this.props.validarCampo(jsonValidar);
      this.validarCampo(
        i,
        this.state.data[i][this.state.atrib[this.state.index]],
        this.state.valSelect,
        this.state.index
      );

      item.push(
        <div style={{ marginLeft: 5 }}>
          <TextField
            error={this.state.isValid[i]["valid"] ? false : true}
            id="outlined-name"
            label={this.state.atrib[this.state.index]}
            value={this.state.data[i][this.state.atrib[this.state.index]]}
            onChange={e => this.handleChangeInput(e, i)}
            margin="normal"
            variant="outlined"
          />
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
            style={{marginLeft:5, marginTop:15}}
          select
          variant="outlined"
          color="#fff"
          label="Filtro"
          value={this.state.valSelect}
          onChange={e => this.handleChangeSelect(e, this.state.index)}
        >
          {ranges.map(ranges => (
            <MenuItem key={ranges.value} value={ranges.value}>
              {ranges.label}
            </MenuItem>
          ))}
        </TextField>

        {item}
      </div>
    );
  }

  handleChangeInput(e, index) {
    var value = e.target.value;
    var json = this.state.data;

    json[index][this.state.atrib[this.state.index]] = value;
    this.setState({
      data: json
    });

    var jsonValidar = {
      0: this.state.valid0,
      1: this.state.valid1,
      2: this.state.valid2,
      3: this.state.valid3,
      4: this.state.valid4
    };
    this.props.onChangeInputChildren(jsonValidar);
    this.props.validarCampo(jsonValidar);
  }

  handleChangeSelect(e, index) {
    var value = e.target.value;

    this.setState({
      valSelect: value
    });

    var json = {
      valueSelect: value,
      indexComponente: index,
      isValid: this.state.isValid
    };
    this.props.onChangeSelect(json);
  }

  validarCampo(indexInput, valInput, select, indexComponente) {
    var json = {};  

    switch(select){

      case '0':
      json = {
        id: indexInput,
        valid: this.ValidarNull(valInput),
        indexComponente: indexComponente
      };
      this.state.isValid[indexInput] = json;
      break;

      case '1':
      json = {
        id: indexInput,
        valid: this.ValidarTexto(valInput),
        indexComponente: indexComponente,
        msg: "Campo inválido - Text only"
      };
      this.state.isValid[indexInput] = json;
      break;

      case '2':
      json = {
        id: indexInput,
        valid: this.ValidarNumeros(valInput),
        indexComponente: indexComponente,
        msg: "Campo inválido - Number only"
      };
      this.state.isValid[indexInput] = json;
      break;

      case '3':
      json = {
        id: indexInput,
        valid: this.ValidarCPF(valInput),
        indexComponente: indexComponente,
        msg: "CPF inválido - (Verificar regra)"
      };
      this.state.isValid[indexInput] = json;
      break;

      case '4':
      json = {
        id: indexInput,
        valid: this.ValidarData(valInput),
        indexComponente: indexComponente,
        msg: "Data inválida - (Verificar regra)"
      };
      this.state.isValid[indexInput] = json;
      break;
    } 
  
  
  }

  ValidarNull(texto) {
    return texto == "" ? false : true;
  }

  ValidarTexto(texto) {
    var er = /^[a-zA-Z]+$/;

    return er.test(texto);
  }

  ValidarNumeros(texto) {
    var er = /^[0-9]+$/;

    return er.test(texto);
  }

  ValidarCPF(texto) {
    texto = texto.replace(".", "");
    texto = texto.replace(".", "");
    texto = texto.replace("-", "");
    return this.validaCPF(texto);
  }

  ValidarData(texto) {
    return false;
    //Depende de como você quer
  }

  validaCPF(cpf) {
    if (typeof cpf == "string") {
      cpf.replace(".", "");
      cpf.replace("-", "");
    }

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    } else return false;
  }
}
