import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useField } from 'formik';

import { Input } from './Input';
import { InputWithLabel } from './InputWithLabel';

const mockField = {
  name: 'input',
  value: '',
  onBlur: jest.fn(),
  onChange: jest.fn(),
};
const mockMeta = {
  value: '',
  touched: false,
  error: undefined,
  initialValue: '',
  initialTouched: false,
  initialError: false,
};
const mockMetaWithError = {
  touched: true,
  error: 'Required',
  initialError: undefined,
  initialTouched: false,
  initialValue: '',
  value: '',
};
const mockPropsForField = {
  id: 'input',
  placeholder: '',
  disabled: false,
  readonly: false,
  forId: 'input',
  label: 'Input label',
};

jest.mock('formik');

describe('Input component', () => {
  it('renders correctly', () => {
    (useField as jest.Mock).mockReturnValue([mockField, mockMeta]);

    const props = {
      ...mockPropsForField,
      ...mockField,
    };
    const { asFragment } = render(<Input type='text' {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should value changed', async () => {
    (useField as jest.Mock).mockReturnValue([mockField, mockMeta]);

    const props = {
      ...mockPropsForField,
      ...mockField,
    };

    const user = userEvent.setup();
    render(<Input type='text' {...props} />);

    await user.type(screen.getByRole('textbox'), 'Test value');
    expect(props.onChange).toBeCalledTimes(10);
  });

  it('should be invalid', () => {
    (useField as jest.Mock).mockReturnValue([mockField, mockMetaWithError]);

    const props = {
      ...mockPropsForField,
      ...mockField,
    };
    const { asFragment } = render(<Input type='text' {...props} />);

    expect(screen.getByRole('textbox')).toHaveClass('isInvalid');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with label correctly', () => {
    (useField as jest.Mock).mockReturnValue([mockField, mockMeta]);

    const props = {
      ...mockPropsForField,
      ...mockField,
    };
    const { asFragment } = render(<InputWithLabel type='text' {...props} />);

    expect(screen.getByLabelText('Input label')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
