import React from 'react';
import Api from '../services/ApiService';

interface Post {
    title: string;
    created_at: string;
    copy: string;
    author: string;
}

type PostListPageState = {
    posts: Post[]
}

class PostListPage extends React.Component<{}, PostListPageState> {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        Api.getAllPosts()
            .then(result => {
                console.log(result.posts);
                this.setState({
                    posts: result.posts
                });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>

                <div className="post-list">
                    {
                        this.state.posts.length > 0 && this.state.posts.map(post => {
                            return (
                                <div className="post">
                                    <h2>{post.title}</h2>
                                    <h5>By {post.author} at {post.created_at}</h5>
                                    <p>{post.copy}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default PostListPage;
