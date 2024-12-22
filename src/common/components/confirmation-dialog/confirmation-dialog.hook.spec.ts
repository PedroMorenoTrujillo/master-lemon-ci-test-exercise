import { createEmptyLookup } from '#common/models';
import { act, renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open the dialog and set item to delete', () => {
    const testItem = { id: '123', name: 'Test Item' };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(testItem);
  });

  it('should reset itemToDelete when accepting', () => {
    const testItem = { id: '123', name: 'Test Item' };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onAccept();
    });
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should close the dialog without modifying itemToDelete', () => {
    const testItem = { id: '123', name: 'Test Item' };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(testItem);
    });
    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(testItem);
  });
});
