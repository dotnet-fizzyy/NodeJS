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
        this.username = '';
    }
}

export class Comment {
    constructor() {
        this.id = '';
        this.postId = '';
        this.userId = '';
        this.comment = '';
        this.creationDate = Date.now();
        this.likes = [];
    }
}