import React from 'react';
import API from '../API';
import { Button, Header, Modal, Form} from 'semantic-ui-react'

class EditSongForm extends React.Component {
    state = { 
        title: this.props.song.title,
        artist: this.props.song.artist,
        image: {},
        spotify: this.props.song.spotify,
        soundcloud: this.props.song.soundcloud
     }

     newSongInState = event => {
        if (event.target.name === "image") {
            this.setState({
                [event.target.name]: event.target.files[0]
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    EditSubmit = (event) => {
        const {title, artist, spotify, soundcloud} = this.state
        event.preventDefault()
        let selectedSong = {
            title: title,
            artist: artist,
            spotify: spotify,
            soundcloud: soundcloud
        }
        API.patch(`update_song/${this.props.song.id}`, selectedSong)
        .then(song => {this.props.uploadFile(this.state.image, song.id)})
        .then(() => this.props.hideEditForm())
    }

    render() { 
        const {title, artist, spotify, soundcloud} = this.state
        return ( 
            <Modal as={Form} open={true} onSubmit={this.EditSubmit} onClose={() => this.props.hideEditForm()} closeIcon>
                  <Header icon='archive' content='Edit Song' size="tiny"/>
                  <Modal.Content>
                    <Form.Input label="Title:" type="text" name="title" value={title} onChange={this.newSongInState}/>
                    <Form.Input label="Artist:" type="text" name="artist" value={artist} onChange={this.newSongInState}/>
                    <Form.Input label="Image:" type="file" accept=".png, .jpg, .jpeg" name="image" onChange={this.newSongInState}/>
                    <Form.Input label="Spotify:" type="text" name="spotify" value={spotify ? spotify : ""} onChange={this.newSongInState}/>
                    <Form.Input label="Soundcloud:" type="text" name="soundcloud" value={soundcloud ? soundcloud : ""} onChange={this.newSongInState}/>
                  </Modal.Content>
                  <Modal.Actions>
                  <Button type="submit" color="green" icon="save" content="Save" />
                  </Modal.Actions>
            </Modal>
         );
    }
}
 
export default EditSongForm;