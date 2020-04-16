const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

router.post('/login', function(req, res) {
    const {email, password} = req.body

    if(!email) {
         // フロント側制御(required) のため画面から確認不可 ※APIを叩いて確認
         return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください!'}]})
    }
    if(!password) {
        // フロント側制御(required) のため画面から確認不可 ※APIを叩いて確認
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください!'}]})
    }

    User.findOne({email}, function(err, foundUser) {
        if(err) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!'}]})
        }
        if(!foundUser) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'ユーザーが存在しません!'}]})
        }

        if(!foundUser.hasSamePassword(password)) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードが一致しません!'}]})
        }

        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username
          }, config.SECRET, { expiresIn: '1h' });

        return res.json(token)

    })  

})

router.post('/register', function(req, res) {
    const {username, email, password, confirmPassword} = req.body
    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password
    // const confirmPassword = req.body.confirmPassword

    if(!username) {
        // フロント側制御(required) のため画面から確認不可 ※APIを叩いて確認
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'ユーザー名を入力してください!'}]})
    }
    if(!email) {
         // フロント側制御(required) のため画面から確認不可 ※APIを叩いて確認
         return res.status(422).send({ errors: [{ title: 'User error', detail: 'Eメールを入力してください!'}]})
    }
    if(!password) {
        // フロント側制御(required) のため画面から確認不可 ※APIを叩いて確認
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードを入力してください!'}]})
    }
    if(password !== confirmPassword) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'パスワードが確認用パスワードと一致しません!'}]})
    }

    User.findOne({email}, function(err, foundUser) {
        if(err) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!'}]})
        }
        if(foundUser) {
            return res.status(422).send({ errors: [{ title: 'User error', detail: 'メールアドレスが重複しています!'}]})
        }

        const user = new User({username, email, password})
        user.save(function(err) {
            if(err) {
                return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!!'}]})
            }
            return res.json({ "regsterd": true})
        })
    })  

})

module.exports = router
