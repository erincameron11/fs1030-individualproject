const fs = require('fs');

module.exports = {
    getLoginPage: (req, res) => {
        res.render('login.ejs', {
            title: "Welcome to Erin's Site!"
        });
    }
};