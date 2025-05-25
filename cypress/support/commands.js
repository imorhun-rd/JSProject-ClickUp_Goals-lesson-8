// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {faker} from "@faker-js/faker";


Cypress.Commands.add('sendRequest', (endpoint, method, body = null) => {
    return cy.request({
        method: method,
        url: endpoint,
        headers: {
            'Authorization': Cypress.env('Authorization'),
            'Content-Type': 'application/json'
        },
        body: body,
        failOnStatusCode: true
    });
});


// Cypress.Commands.add('getAllGoals', () => {
//     cy.sendRequest('team/90151115904/goal', 'GET')
// });


Cypress.Commands.add('getGoal', (goal_id) => {
    cy.sendRequest('goal/' + (goal_id), 'GET')
});


Cypress.Commands.add('createGoal', () => {
    cy.sendRequest('team/90151115904/goal', 'POST', {
        "name": faker.person.jobTitle(),
        "description": faker.lorem.words(5)
    })
        .then((response) => {
            expect(response.status).to.equal(200)
            cy.wrap(response.body.goal.id).as('goal_id')
        })
    cy.get('@goal_id').then((goal_id) => {
        cy.getGoal(goal_id)
            .then((response) => {
                expect(response.status).to.equal(200)
            })
    })
});


Cypress.Commands.add('updateGoal', () => {
    cy.createGoal()
    cy.get('@goal_id').then((goal_id) => {
        cy.sendRequest('goal/' + (goal_id), 'PUT', {
            "name": faker.person.jobTitle(),
            "description": faker.lorem.words(5)
        })
    })
});


Cypress.Commands.add('deleteGoal', (goal_id) => {
    cy.sendRequest('goal/' + (goal_id), 'DELETE')
});


Cypress.Commands.add('createGoalFromFile', (body) => {
    cy.sendRequest('team/90151115904/goal', 'POST', body)
});