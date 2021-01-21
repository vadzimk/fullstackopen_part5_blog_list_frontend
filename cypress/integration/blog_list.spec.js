describe('Blog app', function (){
    beforeEach(function (){
        cy.request('POST', 'http://127.0.0.1:3001/api/testing/reset')

        // create initial user
        const user = {name: 'testuser', username: 'testusername', password:'1233'}
        cy.request('POST', 'http://127.0.0.1:3000/api/users', user)

        cy.visit('http://127.0.0.1:3000')
    })

    it('Login form is shown', function (){
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
})