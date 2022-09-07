"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUserData = exports.fakeUsersData = exports.fakeBlogData = exports.fakeBlogsData = void 0;
exports.fakeBlogsData = {
    data: [
        {
            _id: '6301d878aab1bd4c98e654af',
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
            __v: 0,
        },
        {
            _id: '630595c5c2dec7161479d91f',
            title: 'Test Blog 2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            author: 'NeptuneRjo',
            date: '2022-08-24T00:29:15.931Z',
            comments: [
                {
                    username: 'NeptuneRjo',
                    body: 'New comment',
                },
            ],
            __v: 0,
        },
    ],
};
exports.fakeBlogData = {
    data: {
        _id: '6301d878aab1bd4c98e654af',
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
        __v: 0,
    },
};
exports.fakeUsersData = {
    data: [
        {
            _id: { $oid: '62ef09e478dd6f1a2e1b95fd' },
            email: 'test1@user.com',
            password: '$2a$10$p0EorzzVjaimmK/45h3OQuIECK52jeQc3Ekr/4eOOUHkEBcEf7RbS',
            __v: { $numberInt: '0' },
            role: 'Admin',
            username: 'testAccount',
        },
        {
            _id: { $oid: '63002e85542ad82ff0bd603d' },
            email: 'test2@user.com',
            password: '$2a$10$ms.nTSUeh99ITVMi6jDC/e/pg2Ymq4LjxC3MxY2/77jEg1FwkO1ey',
            role: 'User',
            username: 'test',
            __v: { $numberInt: '0' },
        },
    ],
};
exports.fakeUserData = {
    data: {
        _id: { $oid: '62ef09e478dd6f1a2e1b95fd' },
        email: 'test1@user.com',
        password: '$2a$10$p0EorzzVjaimmK/45h3OQuIECK52jeQc3Ekr/4eOOUHkEBcEf7RbS',
        __v: { $numberInt: '0' },
        role: 'Admin',
        username: 'testAccount',
    },
};
