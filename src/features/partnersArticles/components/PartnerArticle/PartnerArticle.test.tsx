import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PartnerArticle } from '@features/partnersArticles/components/PartnerArticle/PartnerArticle';
import { rest, server } from '../../../../__mocks__/__msw__';
import { partnerArticlesFirebaseAPIStub } from '@features/partnersArticles/stubs';

describe('PartnerArticle', () => {
  test('Рендерит компонент статьи после загрузки', async () => {
    server.use(
      rest.get(
        'https://firestore.googleapis.com/v1/projects/karpov-news/databases/:id/documents/partners-posts/',
        (req, res, ctx) => {
          return res(ctx.json(partnerArticlesFirebaseAPIStub));
        }
      )
    );

    render(<PartnerArticle />);

    const article = await screen.findByTestId('article');
    const companyName = screen.getByText(/JetBrains/i);
    const image = screen.getByAltText(/Copy brackets/i);
    const title = screen.getByText(/Copy brackets/i);
    const description = screen.getByText(/Copy all code between these brackets to clipboard/i);

    expect(article).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('Не рендерит компонент статьи при ошибке загрузки', async () => {
    server.use(
      rest.get(
        'https://firestore.googleapis.com/v1/projects/karpov-news/databases/:id/documents/partners-posts/',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<PartnerArticle />);

    await waitFor(() => {
      expect(screen.queryByTestId('article')).toBeNull();
    });
  });
});
