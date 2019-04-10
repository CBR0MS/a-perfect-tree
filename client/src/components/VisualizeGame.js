import React from 'react'
import axios from 'axios'

import VisualizeSnippet from './VisualizeSnippet'

const uuidv4 = require('uuid/v4')

 class VisualizeGame extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios
          .get(`/api/games/${id}`)
          .then(res => {
            if (res.data) {
              this.setState({
                gameName: res.data[0].name,
                gameSnippets: res.data[0].snippets,

              });
            }
          })
          .catch(err => console.log(err));
    }


render(){
    
    let viz = <div/>
    if (this.state.gameSnippets) {
        viz = this.state.gameSnippets.map((value) => 
            <div className='padder' key={uuidv4()}>
                <VisualizeSnippet snippetId={value.id}/>
            </div>
        )
    }

    return (
        <div className='snipArea'>
            {viz}
        </div>

    )

}
    
    
   
}

export default VisualizeGame