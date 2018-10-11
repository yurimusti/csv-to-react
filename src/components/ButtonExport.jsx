import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class ButtonExport extends Component{

    constructor(props) {
      super(props)
    
      this.state = {
         list : []
      };
    };
    
funcao()
{ 

}

    render(){

        return(
            <div>
                <button onClick={()=>this.funcao()}>Exportar</button>
            </div>
        );
    }

    
}


