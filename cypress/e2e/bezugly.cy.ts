describe("bezugly's site test", () => {
  beforeEach(() => {
    cy.viewport(1600, 1000);
  });

  it('Главная открывается', () => {
    cy.visit('http://bezugly.ru');
    cy.contains('Дима Безуглый').should('exist');
  });

  it('Переход в блог осуществляется', () => {
    cy.visit('http://bezugly.ru');
    cy.get('.styles_navList__oGqIk > :nth-child(1) > .theme_link__i0Gzh > .theme_linkUnderline__WWSHg').click();
    cy.url().should('include', 'blog');
  });

  it('В блоге можно открыть заметку, и откроется именно она', () => {
    cy.visit('http://bezugly.ru/blog');
    cy.get(':nth-child(1) > .theme_link__i0Gzh > .theme_title__i_50Z > .theme_linkUnderline__WWSHg').click();
    cy.url().should('include', 'intro-to-astro-course');
    cy.contains('Бесплатный мини-курс «Введение в Astro»').should('exist');
  });

  it('В заметке можно открыть предыдущую заметку, и откроется именно она', () => {
    cy.visit('http://bezugly.ru/blog/intro-to-astro-course');
    cy.get('.post_recentText__F_nkV').click();
    cy.url().should('include', 'chatgpt-frontend');
    cy.contains('ChatGPT во фронтенде').should('exist');
  });

  it('В заметке можно открыть следующую заметку, и откроется именно она', () => {
    cy.visit('https://bezugly.ru/blog/notion-api-files');
    cy.get(':nth-child(2) > .post_recentLink__U2M7L > .post_recentText__F_nkV').click();
    cy.url().should('include', 'state-of-js-2022');
    cy.contains('Обзор State of JS 2022').should('exist');
  });
});
