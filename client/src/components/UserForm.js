import React from 'react'
import '../App.css'
import axios from 'axios';


class ReactFormLabel extends React.Component {
    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}

class ReactForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            imageLoading: false,
            imageUrl: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let newState = {}

        newState[e.target.name] = e.target.value

        this.setState(newState)
    }

    onimageUploadHandler = (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        this.setState({ imageLoading: true });
        axios.post("/uploadImage", data)
            .then(res => {
                console.log(res.statusText)
                console.log(res.data);
                this.setState({ imageLoading: false, imageUrl: res.data.filename })
            }).catch(err => {
                console.log('error in uploading', err);
                this.setState({ imageLoading: false })
            })

    }


    handleSubmit = (e, message) => {
        e.preventDefault()
        const { firstName, lastName, phone, email, imageUrl } = this.state;


        let formData = {
            firstName,
            lastName,
            phone,
            email,
            image: imageUrl
        }

        if (formData.firstName.length < 1 || formData.lastName.length < 1 || formData.phone.length < 1 || formData.email.length < 1) {
            return false
        }

        if (!imageUrl) {
            alert('Image not uploaded. Please upload image first');
            return false;
        }

        axios.post('/api/user/register', formData).then(res => {
            this.setState({ imageLoading: false, imageUrl: res.data.filename });
            alert('Successfully submitted user details');
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                imageUrl: ''
            })
        }).catch(err=>{
            console.log('err in form submission',err);
            alert('Error in form submission',err);
        })


        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        })
    }

    render() {
        return (
            <form className='react-form' onSubmit={this.handleSubmit}>
                <h1>User Registration</h1>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formName' title='First Name:' />

                    <input id='formName' className='form-input' name='firstName' type='text' required onChange={this.handleChange} value={this.state.firstName} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formName' title='Last Name:' />

                    <input id='formName' className='form-input' name='lastName' type='text' required onChange={this.handleChange} value={this.state.lastName} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formEmail' title='Email:' />

                    <input id='formEmail' className='form-input' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formSubject' title='Phone number:' />

                    <input id='formPhone' className='form-input' name='phone' type='tel' required onChange={this.handleChange} value={this.state.phone} />
                </fieldset>

                <fieldset className='form-group'>
                    <ReactFormLabel htmlFor='formSubject' title='Image:' />

                    <input id='formEmail' className='form-input' name='image' type='file' accept="image/*" required onChange={this.onimageUploadHandler} />
                </fieldset>


                <div className='form-group'>
                    <input id='formButton' className='btn' type='submit' placeholder='Submit' disabled={this.state.imageLoading} />
                </div>
            </form>
        )
    }
}

export default ReactForm;