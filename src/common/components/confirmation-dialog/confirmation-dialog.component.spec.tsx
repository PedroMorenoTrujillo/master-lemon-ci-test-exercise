import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

interface LabelProps {
  closeButton: string;
  acceptButton: string;
}

interface Props {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
  title: string | React.ReactNode;
  labels: LabelProps;
  children: React.ReactNode;
}

describe('ConfirmationDialogComponent', () => {
  const mockOnAccept = vi.fn();
  const mockOnClose = vi.fn();
  const propsMock: Props = {
    isOpen: true,
    onAccept: mockOnAccept,
    onClose: mockOnClose,
    title: 'Confirmation Title',
    labels: {
      closeButton: 'Close',
      acceptButton: 'Accept',
    },
    children: 'Are you sure you want to proceed?',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render dialog with title and children', () => {
    render(<ConfirmationDialogComponent {...propsMock} />);
    expect(screen.getByText('Confirmation Title')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?')
    ).toBeInTheDocument();
  });

  it('should render the close and accept buttons with correct labels', () => {
    // Arrange & Act
    render(<ConfirmationDialogComponent {...propsMock} />);

    // Assert
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...propsMock} />);

    // Act
    fireEvent.click(screen.getByText('Close'));

    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onAccept and onClose when the accept button is clicked', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...propsMock} />);

    // Act
    fireEvent.click(screen.getByText('Accept'));

    // Assert
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not render dialog when isOpen is false', () => {
    // Arrange
    const props = { ...propsMock, isOpen: false };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByText('Confirmation Title')).not.toBeInTheDocument();
  });
});
