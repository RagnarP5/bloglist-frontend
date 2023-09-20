import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component tests', () => {
    const blog = {
        title: "Jest title",
        author: "Jest author",
        url: "Jest url",
        likes: 5
    }
    const mockHandleLikes = jest.fn()
    const mockHandleDelete = jest.fn()

    test('renders content', () => {


        const component = render(<Blog blog={blog} handleLikes={mockHandleLikes} handleDelete={mockHandleDelete}/>)
        expect(component.container).toHaveTextContent('Jest title Jest author')
        expect(component.container).not.toHaveTextContent("Jest url")
        expect(component.container).not.toHaveTextContent("likes")
    })

    test('clicking the view button displays url and number of likes', async () => {
        const mockClickHandler = jest.fn()
        const component = render(<Blog blog={blog} handleLikes={mockClickHandler} handleDelete={mockHandleDelete}/>)
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('Jest url')
        expect(component.container).toHaveTextContent('likes 5')
    })

    test('clicking the like button twice event handler component is called twice', () => {
        const mockLiker = jest.fn()
        const component = render(<Blog blog={blog} handleLikes={mockLiker} handleDelete={mockHandleDelete}/>)
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLiker.mock.calls).toHaveLength(2)
    })
})

