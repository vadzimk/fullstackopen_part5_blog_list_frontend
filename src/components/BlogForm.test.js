import React from "react"
import {render, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect.js'
import BlogForm from "./BlogForm.js";

describe('BlogForm component', () => {

    const blog = {title: 'test-title', author: 'test-author', url: 'http://127.0.0.1:3001', likes: 0, user: ''}

    test('form calls event handler from pops', () => {
        const handleCreateBlogMock = jest.fn()
        const component = render(<BlogForm handleCreateBlog={handleCreateBlogMock}/>)

        const form = component.container.querySelector('form')
        // const title = component.container.querySelector('#title')
        const title = component.container.querySelector('input[name=title]') //CSS [attribute=value] Selector
        const author = component.container.querySelector('#author')

        fireEvent.change(title, {target: {value: "test-title"}})
        fireEvent.change(author, {target: {value: 'test-author'}})
        fireEvent.submit(form)

        expect(handleCreateBlogMock.mock.calls).toHaveLength(1)
        expect(handleCreateBlogMock.mock.calls[0][0]).toMatchObject(
            {title: 'test-title', author: 'test-author', url: ''})
    })
})