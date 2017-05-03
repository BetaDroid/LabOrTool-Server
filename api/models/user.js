/**
 * Created by Daniel on 24/04/17.
 */

var Id, Username, Password;

function User(_id, _username, _password) {
    this.Id = _id;
    this.Username = _username;
    this.Password = _password;
}

User.prototype.getId = function() {
    return this.Id;
};

User.prototype.getUsername = function() {
    return this.Username;
};

User.prototype.getPassword = function() {
    return this.Password;
};

User.prototype.setId = function(_id) {
    this.Id = _id;
};

User.prototype.setUsername = function(_username) {
    this.Username = _username;
};

User.prototype.setPassword = function(_password) {
    this.Password = _password;
};

module.exports = User;
