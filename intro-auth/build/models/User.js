"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, nickname, email, password) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.getId = () => {
            return this.id;
        };
        this.getNickname = () => {
            return this.nickname;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getPassword = () => {
            return this.password;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setNickname = (newNickname) => {
            this.nickname = newNickname;
        };
        this.setEmail = (newEmail) => {
            this.email = newEmail;
        };
        this.setPassword = (newPassword) => {
            this.password = newPassword;
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map