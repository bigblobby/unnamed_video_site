const create = async (req, res) => {
    const {Post} = await require('../Model');
    const {title, copy} = req.body;

    if(!title) return res.status(500).json({error: 'You must provide a title'});
    if(!copy) return res.status(500).json({error: 'You must provide copy'});

    Post.create({
        user_id: req.tokenData.id,
        title: title,
        copy: copy
    }).then(async (result) => {
        if(result[0]){
            const post = await Post.findById(result[0]);

            res.status(201).json({post: post[0], message: 'success'});
        } else {
            res.status(500).json({error: 'Something appears to have gone wrong'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: 'Something appears to have gone wrong'});
    })
}

module.exports = {
    create: create
}
