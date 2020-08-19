const fs = require('fs');

module.exports = {
    getHomePage: (req, res) => {
        res.render('index.ejs', {
            title: "Erin Cameron"
        });
    }
};