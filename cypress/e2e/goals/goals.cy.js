// ESM
import {faker} from '@faker-js/faker';
import {getAllMyGoals} from "../../modules/goals";


describe('Test Goals on ClickUp', () => {
    it('Should send GET request and return 200 (all goals)', () => {
        getAllMyGoals()
            .then((response) => {
                expect(response.status).to.equal(200);
            });
    });

    it('Should send POST request from file and return 200', () => {
        cy.fixture('create_goal.json').then((body) => {
            body.name = faker.person.jobTitle();
            body.description = faker.lorem.words(5)
            cy.createGoalFromFile(body)
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
    })

    it('Should sent CRUD request with valid body and return 200', () => {

        cy.updateGoal()
            .then((response) => {
                expect(response.status).to.equal(200)
                cy.wrap(response.body.goal.name).as('goal_name')
            })
        cy.get('@goal_id').then((goal_id) => {
            cy.get('@goal_name').then((goal_name) => {
                cy.getGoal(goal_id)
                    .then((response) => {
                        expect(response.status).to.equal(200)
                        expect(response.body.goal.name).to.be.equal(goal_name)
                    })

                cy.deleteGoal(goal_id)
                    .then((response) => {
                        expect(response.status).to.equal(200)
                    })
            })
        })
    })
})