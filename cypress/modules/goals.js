
export const getAllMyGoals = () => {
      return cy.sendRequest('team/90151115904/goal', 'GET')
}