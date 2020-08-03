import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneInputs: [{}],
            countInputs: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handlePhone(event) {
        let newState = [...this.state.phoneInputs];
        newState.forEach(function(phone) {
            phone[event.target.name] = event.target.value
        });
        this.setState({phoneInputs: newState});
    }

    add() {
        this.setState(prevState => {
            return {countInputs: prevState.countInputs + 1}
        })
    }

    getData() {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumbers: this.state.phoneInputs.map(function (phone) {
                return (Object.values(phone))[0];
            })
        };

        return data;
    }

    handleSubmit(event) {
        console.log('KKKKKKK', this.getData());
        fetch('http://127.0.0.1/v1/employees', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.getData())
        })
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const inputs = [];

        for (let i = 1; i <= this.state.countInputs; i++) {
            inputs.push(
                <div key={`phone_${i}`}>
                    <p>phone:</p>
                    <input name={`phone-${i}`} onChange={this.handlePhone} />
                </div>
            )
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>firstName:</p>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                    <p>lastName:</p>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    {inputs}
                    <br />
                    <input type="submit" value="Send" />
                </form>
                <button onClick={this.add}>Add phone</button>
            </div>
        );
    }
}

export default Form;