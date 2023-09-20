import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm tests', () => {
    test('Test that the event handler is called when new blog is created', () => {
        const mockCreateBlog = jest.fn()
        const component = render(<BlogForm createBlog={mockCreateBlog}/>)

        const input = component.container.querySelector('#title')
        const form = component.container.querySelector('form')

        fireEvent.change(input, {
            target: {value: 'Got To Statement Considered Harmful'}
        })
        fireEvent.submit(form)

        expect(mockCreateBlog.mock.calls).toHaveLength(1)

    })
})