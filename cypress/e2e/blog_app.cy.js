describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', () => {
    cy.contains('log in')
  })
  describe('Login', function() {
    beforeEach(function() {
      const user = {
        name: 'Ragnar',
        username: 'rpalsson',
        password: 'sekret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })
    it('Succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('rpalsson')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Ragnar is logged in')
    })
    it('Fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('rpalsson')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })
})