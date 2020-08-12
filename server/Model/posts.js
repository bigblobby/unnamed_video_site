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

    function findAllByUserId(id){
        //return knex.
    }

    return {
        ...guts,
        findAllByUserId
    }
}
