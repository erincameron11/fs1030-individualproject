const fs = require('fs');

module.exports = {
    getResumePage: (req, res) => {
        let query = "SELECT * FROM `resume` ORDER BY resume_id ASC"; // query database to get all the resume

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/index');
            }
            res.render('resume-index.ejs', {
                title: "Welcome to Erin's Resume | Submit a new job entry"
                ,resume: result
            });
        });
    },

    addResumePage: (req, res) => {
        res.render('add-resume.ejs', {
            title: "Welcome to Erin's Resume | Submit a new job entry"
            ,message: ''
        });
    },
    addResume: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let position = req.body.position;
        let company = req.body.company;
        // let job_start = req.body.job_start;
        // let job_end = req.body.job_end;
        let description = req.body.description;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = 'resume' + company + '.' + fileExtension;

        let resumeQuery = "SELECT * FROM `resume` WHERE company = '" + company + "'";

        db.query(resumeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Resume job entry already exists';
                res.render('add-resume.ejs', {
                    message,
                    title: "Welcome to Erin's Resume | Submit a new job entry"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the resume's details to the database
                        let query = "INSERT INTO `resume` (position, company, description, image) VALUES ('" +
                            position + "', '" + company + "', '" + description + "', '" + image_name + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/index');
                        });
                    });
                } else {
                    message = "Whoops! That is an invalid file format. We can only accept 'gif', 'jpeg' and 'png' images at this time.";
                    res.render('add-resume.ejs', {
                        message,
                        title: "Welcome to Erin's Resume | Submit a new job entry"
                    });
                }
            }
        });
    },
    editResumePage: (req, res) => {
        let resumeId = req.params.resume_id;
        let query = "SELECT * FROM `resume` WHERE resume_id = '" + resumeId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-resume.ejs', {
                title: "Edit Resume"
                ,resume: result[0]
                ,message: ''
            });
        });
    },
    editResume: (req, res) => {
        let resumeId = req.params.resume_id;
        let position = req.body.position;
        let company = req.body.company;
        let description = req.body.description;
        // let image_name = req.body.image_name;

        let query = "UPDATE `resume` SET `position` = '" + position + "', `company` = '" + company + "', `description` = '" + description + "' WHERE `resume`.`resume_id` = '" + resumeId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/index');
        });
    },
    deleteResume: (req, res) => {
        let resumeId = req.params.resume_id;
        let getImageQuery = 'SELECT image from `resume` WHERE resume_id = "' + resumeId + '"';
        let deleteUserQuery = 'DELETE FROM `resume` WHERE resume_id = "' + resumeId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/index');
                });
            });
        });
    }
};