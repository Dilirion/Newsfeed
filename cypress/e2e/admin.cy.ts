describe('Админка', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/admin');
    cy.get('.email-modal__close-img').click();
    cy.login();
    cy.wait(2000);
  });

  it('Создание статьи', () => {
    // Перейти в интерфейс создания
    cy.get('.MuiButton-root').click();

    // Вбить все нужные данные
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').type(
      'Тестовая компания'
    );
    cy.get(
      '.MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input'
    ).type('Тестовое название');
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root').type('Тестовая подводка');
    cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root').type(
      'Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст Тестовый текст '
    );
    cy.get('.MuiCardContent-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').attachFile(
      'img.png'
    );
    cy.wait(5000);

    // Нажать на кнопку создания
    cy.get('.MuiButton-root').click();

    // Перейти в список статей, убедиться, что новая статья есть
    cy.get('.MuiListItemButton-root').click();
    cy.contains('Тестовое название').should('exist');

    // Перейти в новую статью и удалить ее
    cy.contains('Тестовое название').click();
    cy.get('#long-button').click();
    cy.get('.MuiMenuItem-root').click();

    // Перейти в список статей и убедиться, что новой статьи нет
    cy.get('.MuiListItemButton-root').click({ force: true });
    cy.contains('Тестовое название').should('not.exist');
  });
});
