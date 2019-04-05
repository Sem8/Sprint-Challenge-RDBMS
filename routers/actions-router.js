const actionsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/lambdasprint.sqlite3"
    }
};

const actionsdb = knex(knexConfig);

actionsRouter.get('/', async (req, res) => {
    try {
        const actions = await actionsdb('actions');
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: `Couldn't retrieve actions: ${error}` });
    }
});

actionsRouter.get('/:id', async (req, res) => {
    try {
        const action = await actionsdb('actions').where({ id: req.params.id }).first();
        res.status(200).json(action);
    } catch (error) {
        res.status(500).json({ message: `Error occurred while retrieving action: ${error}`})
    }
});

actionsRouter.post('/', async (req, res) => {
    try {
        const [id] = await actionsdb('actions').insert(req.body);

        const newAction = await actionsdb('actions').where({ id }).first();

        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: `New actions couldn't be added: ${error}` });
    }
});


module.exports = actionsRouter;