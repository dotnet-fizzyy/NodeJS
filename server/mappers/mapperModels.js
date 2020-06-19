export class User {
    constructor() {
        this.id = '';
        this.name = '';
        this.password = '';
    }
}

export class Post {
    constructor() {
        this.id = '';
        this.userId = '';
        this.tweet = '';
        this.creationDate = Date.now();
        this.likes = [];
        this.comments = [];
    }
}