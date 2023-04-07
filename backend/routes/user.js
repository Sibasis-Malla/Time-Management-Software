const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { name,email,empID, password } = req.body
    // ADD VALIDATION
    User.findOne({ empID: empID }).then((err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${empID}`
            })
        }
        else {
            const newUser = new User({
                name:name,
                email:email,
                empID: empID,
                password: password
            })
            newUser.save().then((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post('/login',
function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
passport.authenticate('local'),
(req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
       empID: req.user.empID
    };
    res.send(userInfo);
}
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log("Logging out")
        })
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router