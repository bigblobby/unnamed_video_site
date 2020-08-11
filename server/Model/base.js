module.exports = ({
    knex = {},
    name = 'name',
    tableName = 'tablename',
    selectableProps = [],
    timeout = 1000
}) => {

    const create = (props) => {
        delete props.id;

        return knex.insert(props)
            .into(tableName)
            .timeout(timeout);
    }

    const findAll = () => {
        return knex.select(selectableProps)
            .from(tableName)
            .timeout(timeout);
    }

    const find = (filters) => {
        return knex.select(selectableProps)
            .from(tableName)
            .where(filters)
            .timeout(timeout);
    }

    const findOne = (filters) => {
        return find(filters)
            .then(results => {
                if (!Array.isArray(results)) return results;

                return results[0];
            })
    }

    const findById = (id) => {
        return knex.select(selectableProps)
            .from(tableName)
            .where('id', id)
            .timeout(timeout);
    }

    const update = (id, props) => {
        delete props.id;

        return knex.update(props)
            .from(tableName)
            .where('id', id)
            .timeout(timeout)
    }

    const destroy = (id) => {
        return knex.del()
            .from(tableName)
            .where('id', id)
            .timeout(timeout)
    }

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy
    }
}
