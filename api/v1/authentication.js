/**
 * Created by Daniel on 19/05/17.
 */

const Api = require('../../configuration/api');

module.exports = function(router, passport) {
    router.post(Api.version+'/login', passport.authenticate('local-login'), function (req, res) {
            res.status(200).json(req.user);
    });

    router.get(Api.version+'/logout', function (req, res) {
        req.logout();
        res.status(200).json({ Message: 'The logout was made successfully!' });
    });
};
