export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;

}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface GlobalError {
    error: string;
}

export interface Post {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    user: string;
}

export interface PostMutation {
    title: string;
    description: string;
    image?: File | null;
}

export interface Comment {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    post: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}