const fs = require('fs');

module.exports = {
    getPortfolioPage: (req, res) => {
        let query = "SELECT * FROM `portfolio` ORDER BY portfolio_id ASC"; // query database to get all the portfolio

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/index');
            }
            res.render('portfolio-index.ejs', {
                title: "Welcome to Erin's Portfolio | Submit a new job entry"
                ,portfolio: result
            });
        });
    },
   
    addPortfolioPage: (req, res) => {
        res.render('add-portfolio.ejs', {
            title: "Welcome to Erin's site | Add a new portfolio project"
            ,message: ''
        });
    },
    addPortfolio: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let project = req.body.project;
        let description = req.body.description;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = 'portfolio' + project + '.' + fileExtension;

        let projectQuery = "SELECT * FROM `portfolio` WHERE project = '" + project + "'";

        db.query(projectQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Project already exists';
                res.render('add-portfolio.ejs', {
                    message,
                    title: "Welcome to Erin's site | Add a new portfolio project"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the portfolio details to the database
                        let query = "INSERT INTO `portfolio` (project, description, portfolio_img) VALUES ('" +
                            project + "', '" + description + "', '" + image_name + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/index');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-portfolio.ejs', {
                        message,
                        title: "Welcome to Erin's site | Add a new portfolio project"
                    });
                }
            }
        });
    },
    editPortfolioPage: (req, res) => {
        let portfolioId = req.params.portfolio_id;
        let query = "SELECT * FROM `portfolio` WHERE portfolio_id = '" + portfolioId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-portfolio.ejs', {
                title: "Edit  Portfolio"
                ,portfolio: result[0]
                ,message: ''
            });
        });
    },
    editPortfolio: (req, res) => {
        let portfolioId = req.params.portfolio_id;
        let project = req.body.project;
        let description = req.body.description;
        // let portfolio_img = req.body.portfolio_img;

        let query = "UPDATE `portfolio` SET `project` = '" + project + "', `description` = '" + description + "' WHERE `portfolio`.`portfolio_id` = '" + portfolioId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/index');
        });
    },
    deletePortfolio: (req, res) => {
        let portfolioId = req.params.portfolio_id;
        let getImageQuery = 'SELECT portfolio_img from `portfolio` WHERE portfolio_id = "' + portfolioId + '"';
        let deleteProjectQuery = 'DELETE FROM `portfolio` WHERE portfolio_id = "' + portfolioId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].portfolio_img;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteProjectQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/index');
                });
            });
        });
    }
};