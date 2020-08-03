import React from 'react';

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

    getData(name='') {
        fetch('http://127.0.0.1/v1/employees?fullName=' + name, {
            method: 'get',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            )
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        // TODO
        this.getData(event.target.value);
    }

    componentDidMount() {
       this.getData()
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <input
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
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
