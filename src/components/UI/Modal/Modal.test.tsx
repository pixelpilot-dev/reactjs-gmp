import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';

const body = document.body;
const mockOnClose = jest.fn();

describe('Modal component', () => {
  it('should show', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeTruthy();
    expect(body).toHaveClass('overflow');
  });

  it('should hide', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal content')).toBeNull();
    expect(body).not.toHaveClass('overflow');
  });

  it('should hide on click close button', async () => {
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal content</div>
      </Modal>
    );

    await user.click(screen.getByRole('button'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
