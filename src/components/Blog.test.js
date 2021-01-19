import React from "react"
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect.js"
import Blog from "./Blog.js";

describe('Blog component', () => {

    const blog = {title: 'test-title', author: 'test-author', url: 'http://127.0.0.1:3001', likes: 0, user: ''}

    test('renders title and author but not url or likes by default', () => {
        const component = render(<Blog blog={blog}/>)
        // component.debug()
        expect(component.container).toHaveTextContent('test-title')
        expect(component.container).toHaveTextContent('test-author')
        expect(component.container).toHaveTextContent('http://127.0.0.1:3001')
        expect(component.container).toHaveTextContent('likes')

        const details = component.container.querySelector('.details')
        expect(details).toHaveStyle('display: none')

    })


    test('url and likes displayed when button "view" is clicked', () => {
        const component = render(<Blog blog={blog}/>)

        const button = component.getByText('view')
        fireEvent.click(button)
        const details = component.container.querySelector('.details')
        expect(details).not.toHaveStyle('display: none')
    })

    test('like button invokes event handler', () => {
        const eventHandlerMock = jest.fn()
        const component = render(<Blog blog={blog} handleUpdateBlog={eventHandlerMock}/>)
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(eventHandlerMock.mock.calls).toHaveLength(2)
    })
})
