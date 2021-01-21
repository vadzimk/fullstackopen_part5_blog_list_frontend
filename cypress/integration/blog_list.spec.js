describe('Blog app', function (){
    beforeEach(function (){
        cy.request('POST', 'http://127.0.0.1:3001/api/testing/reset')
        cy.visit('http://127.0.0.1:3000')
    })

    it('Login form is shown', function (){
        cy.contains('login')
    })
})