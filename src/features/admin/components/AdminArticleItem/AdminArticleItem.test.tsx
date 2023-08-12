import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { partnerArticleAPIStub } from '@features/partnersArticles/stubs';
import { getDoc } from '../../../../__mocks__/firebase/firestore';

describe('AdminArticleItem', () => {
  beforeEach(() => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => partnerArticleAPIStub,
      id: '1',
    } as any);

    render(
      <MemoryRouter initialEntries={['/2']}>
        <Route path="/:id">
          <AdminArticleItem />
        </Route>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Рендерит форму после загрузки', async () => {
    const companyNameInput = await screen.findByDisplayValue(/рога и копыта/i);

    expect(companyNameInput).toBeInTheDocument();
  });

  test('Меняет инпут company-name после ввода данных', async () => {
    const companyNameInput = await screen.findByDisplayValue(/рога и копыта/i);

    userEvent.type(companyNameInput, 'привет');

    expect(screen.getByDisplayValue(/привет/i)).toBeInTheDocument();
  });
});
