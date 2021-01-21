describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://127.0.0.1:3001/api/testing/reset')

        // create initial user
        const user = {name: 'testuser', username: 'testusername', password: '1233'}
        cy.request('POST', 'http://127.0.0.1:3000/api/users', user)

        cy.visit('http://127.0.0.1:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input[name=Username]').type('testusername')
            cy.get('input[name=Password]').type('1233')
            cy.get('button').contains('login').click()
            cy.contains('is logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input[name=Username]').type('testusername')
            cy.get('input[name=Password]').type('wrong')
            cy.get('form').submit()
            cy.contains('invalid username or password').as('notification')
            cy.get('@notification').should('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            // login
            cy.login({username: 'testusername', password: '1233'})
        })

        it('a blog can be created', function () {
            // create blog
            cy.contains('new blog').click()
            cy.get('input[name=title]').type('title from cypress')
            cy.get('input[name=author]').type('author from cypress')
            cy.get('input[name=url]').type('http//')
            cy.get('button').contains('create').click()
            cy.contains('title from cypress author from cypress')

        })

        describe('When several blogs exists', function () {
            beforeEach(function () {
                cy.login({username: 'testusername', password: '1233'})
                cy.createBlog({title: 'test title 1 from cypress', author: 'test author from cypress', url: 'http//'})
                cy.createBlog({title: 'test title 2 from cypress', author: 'test author from cypress', url: 'http//'})
                cy.createBlog({title: 'test title 3 from cypress', author: 'test author from cypress', url: 'http//'})
            })

            it('user can like a blog', function () {
                // like a blog
                cy.contains('test title 2 from cypress').as('theTitle')
                    .contains('view').click()

                // to look at descendent dom elements use .find()
                cy.get('@theTitle').parent().as('theBlog').find('button').contains('like').click()

                cy.get('@theBlog').contains(`likes 1`)


            })
        })
    })


})