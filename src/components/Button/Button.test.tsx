import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@components/Button/Button';

describe('Button', () => {
  test('Рендерит кнопку', () => {
    render(<Button>Привет</Button>);

    expect(screen.getByText(/Привет/i)).toBeInTheDocument();
    expect(screen.queryByAltText('button_spinner')).toBeNull();
  });

  test('Вызывает проп onClick при клике на кнопку', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Привет</Button>);

    userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Рендерит спиннер при пропе loading', () => {
    render(<Button loading>Привет</Button>);

    const spinner = screen.getByAltText('button_spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('Не вызывает проп onClick при пропе loading и при клике на кнопку', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} loading>
        Привет
      </Button>
    );

    userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
