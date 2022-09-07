import Blog from '../models/blogModel'
import { fakeBlogData, fakeFailBlogData } from './fixtures'
import 'jest'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoConfigTesting'

describe('Blog Model', () => {
	beforeAll(async () => {
		const mongoServer = await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	it('should create a blog item successfully', async () => {
		const newBlog = await Blog.create(fakeBlogData)

		expect(newBlog._id).toBeDefined()
		expect(newBlog.body).toBe(newBlog.body)
		expect(newBlog.title).toBe(newBlog.title)
		expect(newBlog.date).toBe(newBlog.date)
		expect(newBlog.comments).toBe(newBlog.comments)
	})

	it('should fail the blog item without the required fields', async () => {
		const newBlog = new Blog(fakeFailBlogData)

		newBlog.validate((err) => {
			expect(err).not.toBe(null)
		})
	})
})
