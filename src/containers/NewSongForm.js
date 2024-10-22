import React from 'react';
import API from '../API';
import { Button, Header, Modal, Form} from 'semantic-ui-react'

class NewSongForm extends React.Component {
    state = { 
        title: '',
        artist: '',
        image: null,
        spotify: '',
        soundcloud: '',
        errors: []
     }

    newSongInState = event => {
        if (event.target.name === "image") {
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
        this.setState({
            [event.target.name]: event.target.value
        })}
    }

     handleSubmit = (event) => {
        const BASE_URL = "http://localhost:3000"
        event.preventDefault()
        let song = {
            title: this.state.title,
            artist: this.state.artist,
            spotify: this.state.spotify,
            soundcloud: this.state.soundcloud
        }
        if (this.state.image) {
            API.post(`${BASE_URL}/songs`, song)
            .then(res => res.json())
            .then(({song, messages}) => {if (messages) {
                this.setState({
                    errors: messages
                })
            } else {this.props.uploadFile(this.state.image, song.id)
                this.props.changeSongFormState()
            }  
        })
        } else {
            this.state.errors.push("No Image Detected")
            this.setState({
                errors: this.state.errors
            })
        }
    }

    render() { 
        const {title, artist, spotify, soundcloud} = this.state
        return ( 
            
            <Modal as={Form} open={true} onSubmit={this.handleSubmit} onClose={() => this.props.changeSongFormState()} closeIcon>
                <Header icon='archive' content='Add A New Song' size="tiny"/>
                <Modal.Content>
                <div className="Errors">
                    {this.state.errors.length > 0
                    ? this.state.errors.map((error, index) => (
                        <h1 key={index}>{error}</h1>
                        ))
                    : null}
                </div>
                    <Form.Input label="Title:" type="text" name="title" value={title} onChange={this.newSongInState}/>
                    <Form.Input label="Artist:" type="text" name="artist" value={artist} onChange={this.newSongInState}/>
                    <Form.Input label="Image:" type="file" accept=".png, .jpg, .jpeg" name="image" onChange={this.newSongInState}/>
                    <Form.Input label="Spotify:"  name="spotify" value={spotify ? spotify : ""} onChange={this.newSongInState}/>
                    <Form.Input label="Soundcloud:"  name="soundcloud" value={soundcloud ? soundcloud : ""} onChange={this.newSongInState}/>
                </Modal.Content>
                <Modal.Actions>
                <Button type="submit" color="green" icon="save" content="Save" />
                </Modal.Actions>
            </Modal>
         );
    }
}
 
export default NewSongForm;