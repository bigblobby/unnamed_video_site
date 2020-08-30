import React from 'react';
import Api from '../services/ApiService';

type PostCreatePageState = {
  title: string;
  text: string;
  message: string;
};
class PostCreatePage extends React.Component<{}, PostCreatePageState> {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value } as { [K in keyof PostCreatePageState]: PostCreatePageState[K] } );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        Api.createPost({
            title: this.state.title,
            copy: this.state.text
        }).then(result => {
            console.log(result);
            this.setState({ message: result.message });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div style={{width: 600, padding: '1rem'}}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="post-title">Title</label>
                            <input className="form-control" type="text" id="post-title" name="title" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post-text">Text</label>
                            <textarea className="form-control" id="post-text" name="text" rows={10} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary" type="submit">Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostCreatePage;
