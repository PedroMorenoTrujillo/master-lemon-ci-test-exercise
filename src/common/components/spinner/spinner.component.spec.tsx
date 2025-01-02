import { usePromiseTracker } from 'react-promise-tracker';
import { Modal } from '@mui/material';
import Loader from 'react-spinners/ScaleLoader';
import { SpinnerComponent } from './spinner.component';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';


vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

vi.mock('@mui/material/styles', () => ({
  createTheme: vi.fn(() => ({
    palette: {
      primary: {
        main: '#1a535c',
      },
      secondary: {
        main: '#d6c254',
      },
      white: '#ffffff',
    },
    typography: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  })),
}));
// Importing the original createTheme function
const originalCreateTheme = createTheme;

// Mocking the createTheme function
vitest.mock('@mui/material/styles', () => ({
  createTheme: vi.fn(() => ({
    palette: {
      primary: {
        main: '#1a535c',
      },
      secondary: {
        main: '#d6c254',
      },
      white: '#ffffff',
    },
    typography: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  })),
}));

describe('SpinnerComponent', () => {
  it('should show Modal with loader when promiseInProgress is true', () => {
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: true });
    render(<SpinnerComponent />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not show Modal when promiseInProgress is false', () => {
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: false });
    render(<SpinnerComponent />);
    expect(screen.queryByRole('loader')).not.toBeInTheDocument();
  });
});
