/**
 * Created by Daniel on 16/05/17.
 */

'use strict';

const LocalStrategy = require('passport-local').Strategy;
const Account = require('../api/models/user/account');

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

                Account.validatePassword(password, user.Password, function (res) {
                    if (!res)
                        return done(null, false);
                });

                return done(null, user);
            });
        }
    ));
};
