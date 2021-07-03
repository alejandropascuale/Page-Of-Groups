const { validationResult } = require ('express-validator');
const jsonTable = require('../database/jsonTable');

const usersModel = jsonTable('users');

module.exports = {
    index: (req, res) => {

        let users = usersModel.all()

        res.render('users/index',  { users });
    },
    create: (req, res) => {
        
        res.render('users/create');
    },
    store: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = req.body;

            userId = usersModel.create(user);

            res.redirect('/users/' + userId);
        } else {
            res.render('users/create', {
                errors: errors.array(),
                oldData: req.body
            },
            );
        }
    },
    show: (req, res) => {
        let user = usersModel.find(req.params.id);

        res.render('users/detail', { user });
    }
}