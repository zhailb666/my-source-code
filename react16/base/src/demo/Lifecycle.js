/*
 * @Author: your name
 * @Date: 2020-08-25 14:08:13
 * @Description: file content
 */
import React from 'react';

class Lifecycle extends React.Component {
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps', '有了此生命周期之后、componentWillReceiveProps是不走的')
        return { a: 1 }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate')
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        console.log('constructor')
    }

    // componentWillMount() {
    //     console.log('componentWillMount')
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        return true
    }

    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate')
    }

    componentDidMount() {
        console.log('componentDidMount-----------------初始化完成')
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    plusCount = () => {
        let { count } = this.state;
        this.setState({ count: ++count })
    }

    render() {
        console.log('render')
        // console.log(this.state, 'this.state')
        // console.log(this.props, 'this.props')
        const { count } = this.state;
        return (
            <>
                <button onClick={this.plusCount}>测试生命周期：请点击 state</button>
                <div>{count}</div>
            </>
        )
    }
}

export default Lifecycle;
