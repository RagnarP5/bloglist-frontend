describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ragnar',
      username: 'rpalsson',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', () => {
    cy.contains('log in')
  })
  describe('Login', function() {

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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'rpalsson', password: 'sekret'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-blog-button').click()

      cy.contains('Test title')
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('Test author')
        cy.get('#url').type('Test url')
        cy.get('#create-blog-button').click()
      })
    it('A blog can be liked', function() {
      cy.get('#view-hide-button').click()
      cy.get('#increase-likes-button').click()
      cy.contains('likes 1')
    })
    it('The creator can delete a blog', function() {
      cy.get('#view-hide-button').click()
      cy.get('#remove-blog-button').click()
      cy.contains('Test title Test author').should('not.exist')
    })
  })
})
})