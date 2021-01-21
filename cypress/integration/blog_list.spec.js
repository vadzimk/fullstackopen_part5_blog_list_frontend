describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://127.0.0.1:3001/api/testing/reset')

        // create initial user
        const user = {name: 'testuser', username: 'testusername', password: '1233'}
        cy.createUser(user)

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

        describe('when user created a blog', function () {
            beforeEach(function () {
                // create a blog
                cy.login({username: 'testusername', password: '1233'})
                cy.createBlog({title: 'test title 1 from cypress', author: 'test author from cypress', url: 'http//'})
            })

            it('can delete it', function () {
                // delete a blog
                cy.contains('test title 1 from cypress').as('theTitle').find('button').contains('view').click()
                cy.get('@theTitle').parent().find('.details').find('button').contains('remove').click()
                cy.get('body', {timeout: 6000}).should('not.contain', 'test title 1 from cypress')

            })


            it.only('another user cannot delete the blog', function () {
                // create another user
                const user = {name: 'blahaaaaa', username: 'blahuser', password: 'secret'}
                cy.createUser(user)
                cy.login({username: user.username, password: user.password})
                cy.visit('http://127.0.0.1:3000')

                let theContent
                const logContent = (element) => {
                    console.log(element.text())
                    theContent = element.text()
                }
                const removeBlog = () => {
                    console.log(theContent)
                    cy.get('body').should('contain', theContent)
                    cy.get("body").should('contain', 'unauthorized deletion')
                }

                // delete first blog
                cy.contains('view').click().parent().then(logContent).parent().contains('remove').click().then(removeBlog)

            })
        })
    })


})