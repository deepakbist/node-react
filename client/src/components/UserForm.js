import React, { Component } from 'react'
import '../App.css'



class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",


        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    phonehandler = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { firstName, lastName, phone, email } = this.state;
        let error;
        if (!firstName) {
            error = 'Please enter first name';
        } else if (!lastName) {
            error = 'Please enter last name';
        } else if (!phone) {
            error = 'Please enter phone';
        } else if (!email) {
            error = 'Please enter email';
        }
        if (error) {
            alert('Error :: ' + error);
            return;
        }
        const reqData = {
            firstName,
            lastName,
            phone,
            email
        }
        console.log('req data',reqData)


        fetch('/api/user/register', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(reqData)
        }).then(res => res.json()).then(json => {
            console.log('res---', json);
        })


        // this.setState({
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     phone: "",
        // })

    }




    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h1>User Registration</h1>
                    <label>First Name :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br />
                    <label>Last Name :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br />
                    <label>Email Id :</label> <input type="text" value={this.state.email} onChange={this.emailhandler} placeholder="Email..." /><br />
                    <label>Phone Number :</label><input type="number" onChange={this.phonehandler} placeholder="Phone..." />
                    <br />
                    <input type="submit" value="Submit" />
                </form>

            </div>

        )
    }
}

export default Form