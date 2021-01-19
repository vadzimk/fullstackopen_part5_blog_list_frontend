import React from "react"
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect.js"
import Blog from "./Blog.js";

describe('Blog component', () => {

    test('renders title and author but not url or likes by default', () => {
        const blog = {title: 'test-title', author: 'test-author', url: 'http://127.0.0.1:3001', likes: 0, user: ''}
        const component = render(<Blog blog={blog}/>)
        // component.debug()
        expect(component.container).toHaveTextContent('test-title')
        expect(component.container).toHaveTextContent('test-author')
        expect(component.container).toHaveTextContent('http://127.0.0.1:3001')
        expect(component.container).toHaveTextContent('likes')

        const details = component.container.querySelector('.details')
        expect(details).toHaveStyle('display: none')



    })
})
