const connection = require("../mysql")
const nodemailer = require("nodemailer")
require("dotenv").config()

exports.insertData = (req, res) => {
    try {
        console.log("krishna")
        var { name, email, password } = req.body

        var sql = `INSERT INTO users (name,email,password,created_at) VALUES ("${name}","${email}","${password}",NOW())`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).json({
                    message: "Successfully inserted."
                })
            }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.getData = (req, res) => {
    try {
        var sql = `SELECT * from users`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find from database " + err
                })
            }
            else {
                return res.status(200).send({
                    DATA: data
                }
                )
            }
        })
    }
    catch (err) {
        return res.status(400).json({
            Problem: "Problem " + err
        })
    }
}

exports.updateData = (req, res) => {
    try {
        const { id, name, email } = req.body
        var sql = `UPDATE users SET ? WHERE id=${id}`
        connection.query(sql, { name: name, email: email }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to find in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "successfully updated."
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

exports.deleteData = (req, res) => {
    try {
        const { id } = req.body
        var sql = `DELETE  FROM users WHERE id= ${id}`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to delete from database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "successfully deleted."
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


exports.sendMail = (req, res) => {
    try {
        const { email, sub, message, filename, path, filename1, path1 } = req.body
        var sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.PASS
            }
        })

        var mailData = {
            from: process.env.EMAILUSER,
            to: email,
            subject: sub,
            text: message,
            attachments: [
                {
                    filename: filename,
                    path: path
                },
                {
                    filename: filename1,
                    path: path1
                }
            ]
        }
        sender.sendMail(mailData, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Email sent successfully."
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


exports.insertMultipleData = (req, res) => {
    try {
        var data1 = [
            {
                "name": "ghee",
                "price": 1000
            },
            {
                "name": "gol",
                "price": 60
            },
            {
                "name": "cha",
                "price": 100
            },
            {
                "name": "khand",
                "price": 40
            },
            {
                "name": "coffee",
                "price": 100
            },
            {
                "name": "milk",
                "price": 70
            },
            {
                "name": "chash",
                "price": 40
            },
            {
                "name": "dabeli",
                "price": 25
            },
            {
                "name": "vadapav",
                "price": 30
            },
            {

                "name": "pavbhaji",
                "price": 100
            }
        ]
        var sql = `INSERT INTO product (name,price) VALUES ?`
        connection.query(sql, [data1.map(data => [data.name, data.price])], (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully inserted."
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

exports.findSecondHighestPrice = (req, res) => {
    try {
        var sql = `SELECT * FROM product GROUP BY price ORDER BY price DESC LIMIT 1` // For highest value
        // var sql = `SELECT * FROM product GROUP BY price ORDER BY price DESC LIMIT 1,1` // For second highest value
        // var sql = `SELECT * FROM product GROUP BY price ORDER BY price DESC LIMIT 2,1` // For third highest value
        connection.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to find in database." + err
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
            Problem: "Problem " + err
        })
    }
}

exports.insertMultipleDataInEmployee = (req, res) => {
    try {
        var data1 = [
            {
                "name": "vinit",
                "salary": 1000
            },
            {
                "name": "saueav",
                "salary": 900
            },
            {
                "name": "vijay",
                "salary": 100
            },
            {
                "name": "chirag",
                "salary": 200
            },
            {
                "name": "yash",
                "salary": 300
            },
            {
                "name": "parth",
                "salary": 400
            },
            {
                "name": "mihir",
                "salary": 440
            },
            {
                "name": "prince",
                "salary": 450
            },
            {
                "name": "neel",
                "salary": 700
            },
            {
                "name": "rohan",
                "salary": 1000
            }
        ]
        var sql = `INSERT INTO employee (name,salary) VALUES ?`
        connection.query(sql, [data1.map(data => [data.name, data.salary])], (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database." + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully Inserted."
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

exports.findHighestSalaryOfEmoloyee = (req, res) => {
    try {
        var sql = `SELECT * FROM employee GROUP BY salary ORDER BY salary DESC LIMIT  1`
        connection.query(sql, (err, data) => {
            if (err) {
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
            Problem: "Problem " + err
        })
    }
}

exports.totalSalary = (req, res) => {
    try {
        var sql = `SELECT SUM(salary *12) AS "Total salary of year" FROM employee `
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database, " + err
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
            Problem: "Problem " + err
        })
    }
}

exports.averageSalary = (req, res) => {
    try {
        var sql = `SELECT AVG(salary) AS "Aeverage Salary Of Employee" FROM employee`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "No able to save in database " + err
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
            Problem: "Problem " + err
        })
    }
}

exports.betweenTwoDateSalary = (req, res) => {
    try {
        const { fd, sd } = req.body
        var fdate = new Date(fd)
        var sdate = new Date(sd)
        var months = sdate.getMonth() - fdate.getMonth() + 12 * (sdate.getFullYear() - fdate.getFullYear())
        var sql = `SELECT SUM(salary * ${months}) AS "Aeverage Salary Of Employee" FROM employee`
        connection.query(sql, (err, data) => {
            if (err) {
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
            Problem: "Problem " + err
        })
    }
}

exports.insertMultipleDataInStudents = (req, res) => {
    try {
        var sql = `INSERT INTO student (name,fees,area,redate) VALUES ?`
        var data1 = [
            {
                "name": "vinit",
                "fees": 35000,
                "area": "Hirawadi",
                "redate": "2022-09-15"
            },
            {
                "name": "saurav",
                "fees": 70000,
                "area": "Bopal",
                "redate": "2022-07-11"
            },
            {
                "name": "chirag",
                "fees": 60000,
                "area": "Botad",
                "redate": "2022-04-12"
            },
            {
                "name": "mihir",
                "fees": 35000,
                "area": "Ghatlodia",
                "redate": "2022-07-01"
            },
            {
                "name": "parth",
                "fees": 35000,
                "area": "Ghatlodia",
                "redate": "2022-08-11"
            },
            {
                "name": "mayank",
                "fees": 15000,
                "area": "Nikol",
                "redate": "2022-09-01"
            },
            {
                "name": "yash",
                "fees": 35000,
                "area": "Bopal",
                "redate": "2022-02-02"
            },
            {
                "name": "vijay",
                "fees": 120000,
                "area": "Ghatlodia",
                "redate": "2022-01-01"
            },
            {
                "name": "prince",
                "fees": 15000,
                "area": "Zarkhand",
                "redate": "2022-09-15"
            },
            {
                "name": "nikhil",
                "fees": 50000,
                "area": "Rajasthan",
                "redate": "2022-09-01"
            },
            {
                "name": "gopal",
                "fees": 35000,
                "area": "Bapunagar",
                "redate": "2022-07-11"
            }
        ]
        connection.query(sql, [data1.map(data => [data.name, data.fees, data.area, data.redate])], (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "SUccessfully Inserted."
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

exports.findAllStudentsBetweenDates = (req, res) => {
    try {
        const { fd, sd } = req.body
        // var fdate = new Date(fd)
        // var sdate = new Date(sd)
        var sql = `SELECT * FROM student WHERE (redate BETWEEN '${fd}' AND '${sd}')`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
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
            Problem: "Problem " + err
        })
    }
}

exports.findAreaWiseStudent = (req, res) => {
    try {
        var sql = `SELECT area, COUNT(area) FROM student GROUP BY area HAVING COUNT(area)`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
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
            Problem: "Problem " + err
        })
    }
}

exports.insertManyInstallment = (req, res) => {
    try {
        var data1 = [
            {
                "amount": 15000,
                "student_id": "1",
                "date": "2022-09-15"
            },
            {
                "amount": 20000,
                "student_id": "1",
                "date": "2022-11-02"
            },
            {
                "amount": 15000,
                "student_id": "2",
                "date": "2022-07-11"
            },
            {
                "amount": 15000,
                "student_id": "2",
                "date": "2022-08-02"
            },
            {
                "amount": 15000,
                "student_id": "2",
                "date": "2022-09-02"
            },
            {
                "amount": 15000,
                "student_id": "3",
                "date": "2022-04-12"
            },
            {
                "amount": 15000,
                "student_id": "3",
                "date": "2022-06-02"
            },
            {
                "amount": 15000,
                "student_id": "4",
                "date": "2022-08-02"
            },
            {
                "amount": 15000,
                "student_id": "4",
                "date": "2022-10-02"
            },
            {
                "amount": 15000,
                "student_id": "5",
                "date": "2022-07-01"
            },
            {
                "amount": 15000,
                "student_id": "6",
                "date": "2022-08-11"
            },
            {
                "amount": 15000,
                "student_id": "7",
                "date": "2022-09-01"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-02-02"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-04-02"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-06-02"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-08-02"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-10-02"
            },
            {
                "amount": 15000,
                "student_id": "8",
                "date": "2022-01-01"
            },
            {
                "amount": 15000,
                "student_id": "10",
                "date": "2022-09-15"
            },
            {
                "amount": 15000,
                "student_id": "10",
                "date": "2022-11-15"
            },
            {
                "amount": 15000,
                "student_id": "11",
                "date": "2022-09-01"
            }
        ]
        var sql = `INSERT INTO installment (amount,date,student_id) VALUES ?`
        connection.query(sql, [data1.map(data => [data.amount, data.date, data.student_id])], (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to save in database. " + err
                })
            }
            else {
                return res.status(200).send({
                    message: "Successfully Inserted. "
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

exports.viewInstallment = (req, res) => {
    try {
        var sql = `SELECT * FROM student as s INNER JOIN installment as i ON s.student_id=i.id GROUP BY i.student_id`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able tron save in database. " + err
                })
            }
            else {
                // for (let i in data) {
                //     var fees = data[i].fees
                //     for (let j in data) {
                //         if (data[i].student_id == data[j].student_id && i != j) {
                //             data[i].amount = data[i].amount + data[j].amount
                //         }
                //     }
                // }
                // const data1 = data.reduce((acc, current) => {
                //     const x = acc.find(item => item.student_id === current.student_id);
                //     if (!x) {
                //         return acc.concat([current]);
                //     } else {
                //         return acc;
                //     }
                // }, []);
                return res.status(200).send({
                    DATA: data
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

exports.findRemainningFees = (req, res) => {
    try {
        var sql = `SELECT * FROM student INNER JOIN installment ON student.id=installment.student_id`
        connection.query(sql, (err, data) => {
            if (err) {
                return res.status(400).json({
                    err: "Not able to find in database. " + err
                })
            }
            else {
                for (let i in data) {
                    var fees = data[i].fees
                    for (let j in data) {
                        if (data[i].student_id == data[j].student_id && i != j) {
                            data[i].amount = data[i].amount + data[j].amount
                        }
                    }
                }
                const data1 = data.reduce((acc, current) => {
                    const x = acc.find(item => item.student_id === current.student_id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                var list = []
                for (let i in data) {
                    data[i].remaingFees = data[i].fees - data[i].amount
                    if (data[i].remaingFees > 0) {
                        list.push(data[i])
                    }
                }

                return res.status(200).json({
                    DATA: list
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

exports.collectionOfStudentFees = (req, res) => {
    try {
        const { fd, sd } = req.body
        var sql = `SELECT * FROM installment WHERE(date BETWEEN '${fd}' AND '${sd}')`
        connection.query(sql, (err, data) => {
            if (err) {
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
            Problem: "Problem " + err
        })
    }
}

exports.totalCollectionOfStudentFees = (req, res) => {
    try {
        const { fd, sd } = req.body
        var sql = `SELECT SUM(amount) AS "Total collection of fees between two dates" FROM installment WHERE(date BETWEEN  '${fd}' AND '${sd}' )`
        connection.query(sql, (err, data) => {
            if (err) {
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
            Problem: "Problem :" + err
        })
    }
}

exports.viewAllInstallment = (req, res) => {
    try {
        var sql = `SELECT i.student_id,GROUP_CONCAT(i.amount) AS amount,GROUP_CONCAT(i.date) AS dates,s.*
        FROM installment i INNER JOIN student s ON i.student_id = s.id
        GROUP BY i.student_id;`
        connection.query(sql, (err, data) => {
            if (err) {
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
            Problem: "Problem " + err
        })
    }
}