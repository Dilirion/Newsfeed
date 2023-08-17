describe('Переход по страницам новостей', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(1600, 1000);
    cy.get('.email-modal__close-img').click();
  });

  it('Главная открывается', () => {
    cy.get('[data-testid="home-page"]').should('exist');
  });

  describe('Переходы по категориям работают', () => {
    ['politics', 'sport', 'tech', 'karpov.courses', 'fashion'].forEach((href) => {
      it(`Переход по ссылке ${href}`, () => {
        cy.get(`.container > .navigation > .navigation__list .navigation__link[href="/${href}"]`).click();
        cy.url().should('include', href);
      });
    });
  });

  it('Страница новости открывается', () => {
    cy.get('.home-page__hero-link').click();
    cy.url().should('include', 'article');
  });
});
