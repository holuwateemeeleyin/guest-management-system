import React, { Component } from 'react'
import axios from 'axios'
class Testing extends Component {


    componentDidMount(){
        axios.get('/api/visitor/get-visitors')
            .then(response => {
                console.log(response.data);
            })
    }


    render(){

        return (
            <div>
                Testing
            </div>
        )
    }
}

export default Testing