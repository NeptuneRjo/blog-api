"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeFailUserData = exports.newUser = exports.fakeUserData = exports.fakeFailBlogData = exports.newBlog = exports.fakeBlogData = void 0;
exports.fakeBlogData = {
    title: 'Test Blog 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'NeptuneRjo',
    date: '2022-08-21T07:01:25.769Z',
    comments: [
        {
            username: 'NeptuneRjo',
            body: 'Hello World',
        },
    ],
};
exports.newBlog = {
    title: 'Test Blog 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'NeptuneRjo',
    comments: [],
};
exports.fakeFailBlogData = {
    title: 1,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'NeptuneRjo',
    date: '2022-08-21T07:01:25.769Z',
    comments: [
        {
            username: 'NeptuneRjo',
            body: 'Hello World',
        },
    ],
};
exports.fakeUserData = {
    email: 'dummy@user.com',
    password: 'dummypassword',
    role: 'Admin',
    username: 'dummyUser',
};
exports.newUser = {
    email: 'dummy@user.com',
    password: 'dummypassword',
    username: 'dummyUser',
};
exports.fakeFailUserData = {
    email: 123,
    password: 'dummypassword',
    role: 'Admin',
    username: 'dummyUser',
};
