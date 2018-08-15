export class UserModel {
    constructor(public username: string, public roles: string[], public votedPolls: string[]) { }
}