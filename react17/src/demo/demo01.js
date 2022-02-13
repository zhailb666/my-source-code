/*
 * @Author: your name
 * @Date: 2020-08-25 14:08:13
 * @Description: file content
 */
import React from 'react';

class Demo01 extends React.Component {
    state = { list: new Array(10000).fill(1) }

    constructor(props) {
        super(props)
        console.log('constructor')
    }

    componentDidMount() {
        console.log('deme01-componentDidMount')
    }

    render() {
        console.log('render')
        return (
            <ul>
                <input />
                {
                    this.state.list.map((item, index) => <li key={ index }>{ item }</li>)
                }
            </ul>
        )
    }
}

export default Demo01;
