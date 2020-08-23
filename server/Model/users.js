const createGuts = require('./base');
const bcrypt = require('bcrypt');

const name = 'User';
const tableName = 'users';
const selectableProps = [
    'id',
    'username',
    'email',
]

const SALT = 10;
const hashPassword = password => bcrypt.hash(password, SALT);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const beforeSave = (props) => {
    return hashPassword(props.password)
        .then(hash => {
            return {...props, password: hash}
        })
        .catch(err => `Error hashing password: ${ err }`)
}

module.exports = (knex) => {
    const guts = createGuts({
        knex,
        name,
        tableName,
        selectableProps
    });

    const create = (props) => {
        return beforeSave(props).then(user => {
            return guts.create(user);
        });
    };

    const verify = (username, password) => {
        const matchErrorMsg = 'Username and password do not match';

        return knex.select()
            .from(tableName)
            .where({ username })
            .timeout(guts.timeout)
            .then(user => {
                if (user.length === 0) throw matchErrorMsg;

                return user[0]
            })
            .then(user => Promise.all([user, verifyPassword(password, user.password)]))
            .then(([user, isMatch]) => {
                if (!isMatch) throw matchErrorMsg;

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
            });
    }

    return {
        ...guts,
        create,
        verify
    }
}
