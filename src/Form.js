import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phones: [],
            countInputs: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    add() {
        this.setState(prevState => {
            return {countInputs: prevState.countInputs + 1}
        })
    }

    handleSubmit(event) {

        console.log('submit', this.state.phones);
        fetch('http://127.0.0.1/v1/employees', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const inputs = [];

        for (let i = 1; i <= this.state.countInputs; i++) {
            inputs.push(
                <div>
                    <p>phone:</p>
                    <input name={`phone-${i}`} />
                    {/*onChange={this.handlePhone}*/}
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
                    <input type="submit" value="Отправить" />
                </form>
                <button onClick={this.add}>Add phone</button>
            </div>
        );
    }
}

export default Form;