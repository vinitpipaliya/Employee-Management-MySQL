const connection = require("../mysql")
exports.insertInUsers = (req, res) => {
    try {
        const { name, email, password, refrence } = req.body
        var sql = `INSERT INTO users (name,email,password,refrence,created_at) VALUES ("${name}","${email}","${password}",${refrence},NOW())`
        connection.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully Added."
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.viewInUser = (req, res) => {
    try {
        // var sql = `SELECT * FROM users AS u INNER JOIN users AS a ON u.refrence=a.id GROUP BY a.refrence`
        var sql = `SELECT i.refrence,
        GROUP_CONCAT(i.name) AS names,
        GROUP_CONCAT(i.email) AS emails,
        s .* FROM users i INNER JOIN users s ON s.id = i.refrence GROUP BY s.refrence;`
        connection.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    DATA: data
                })
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Probelm " + err
        })
    }
}