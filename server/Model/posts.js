const createGuts = require('./base');
const name = 'Post';
const tableName = 'posts';
const selectableProps = [
    'id',
    'user_id',
    'title',
    'copy',
    'created_at'
]

module.exports = (knex) => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    });

    function findAll(){
        return knex('posts')
            .join('users', 'posts.user_id', '=', 'users.id')
            .select('posts.title', 'posts.copy', 'posts.created_at', 'users.username as author');
    }

    function findAllByUserId(id){
        //return knex.
    }

    return {
        ...guts,
        findAll,
        findAllByUserId
    }
}
