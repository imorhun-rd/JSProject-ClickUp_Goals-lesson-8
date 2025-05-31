
export const getAllMyGoals = () => {
      return cy.sendRequest('team/90151236813/goal', 'GET')
}