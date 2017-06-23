/**
 * Created by Daniel on 16/05/17.
 */

'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Account = require('../api/models/user/account');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.Id);
    });

    passport.deserializeUser(function(id, done) {
        Account.getById(id, function(user) {
            if (user === null) {
                return done(null, false);
            }
            done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
            Account.getByUsername(username, function(user) {

                if (user === null)
                    return done(null, false);

                if (password === null)
                    return done(null, user);

                return bcrypt.compare(password, user.Password, function(err, res) {

                    // for test
                    /*
                    bcrypt.hash('password', saltRounds, function(err, hash) {
                        console.log(hash);
                    });*/

                    // res == true
                    if (res)
                        return done(null, user);
                    else
                        return done(null, false);
                });
                /*
                Account.validatePassword(password, user.Password, function (res) {
                    if (!res)
                        return done(null, user);
                        //return done(null, false);
                });*/

                //return done(null, user);
            });
        }
    ));
};
