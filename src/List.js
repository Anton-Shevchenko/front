import React from 'react';
import './App.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            lastName: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getData() {
        fetch('http://127.0.0.1/v1/employees?lastName=' + this.state.lastName, {
            method: 'get',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    console.log(this.state.items);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            )
    }

    searchBuffer() {
        setTimeout(this.getData(), 1000);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
        this.searchBuffer();
    }

    componentDidMount() {
       this.getData()
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                {item.firstName} {item.lastName}
                                <ul>
                                    {item.phones.map(phone => (
                                        <li key={phone}>
                                            {phone}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default List;
