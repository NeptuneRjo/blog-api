export const fakeBlogData = {
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
}

export const fakeFailBlogData = {
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
}

export const fakeUserData = {
	email: 'dummy@user.com',
	password: 'dummypassword',
	role: 'Admin',
	username: 'dummyUser',
}

export const fakeFailUserData = {
	email: 123,
	password: 'dummypassword',
	role: 'Admin',
	username: 'dummyUser',
}
