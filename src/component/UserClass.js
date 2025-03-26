import React from "react";




class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {// this is how we create state variable in class component
            count: 0,
            count2: 2,
        }
    }

    componentDidMount() {
        console.log('component mounted')
        this.timer = setInterval(()=>{console.log('set interval')},1000)
    }
    componentDidUpdate(){
        console.log('component updated')

    }
    componentWillUnmount(){
        console.log('component unmounted')
        clearInterval(this.timer)

    }
    render() {
        const { location } = this.props;
        const { count2 } = this.state;
        return (<div className="cl-card">
            <h6>Count:{this.state.count}</h6>
            <h6>Count2:{count2}</h6>
            <h3>User (classcomponent)</h3>
            <h3>name :{this.props.name}</h3>
            <h4>location :{location}</h4>
            <button onClick={() => {
                this.setState({
                    count: this.state.count + 1// setState will only update count, it will never touch other variables which is defined inside state variable unless we explicitly update it.
                })
            }}>Count Increase</button>
        </div>)
    }
}


export default UserClass;