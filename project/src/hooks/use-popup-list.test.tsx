import { act, renderHook } from '@testing-library/react';
import usePopupList from './use-popup-list';

const getNodeRef = () => ({
  current: document.createElement('ul'),
});

describe('Hook: usePopupList', () => {
  it('should return array with 2 elements and attach event listeners when isSortOptionsOpen=true', () => {
    const { result } = renderHook(() => usePopupList(getNodeRef()));

    const [initialIsSortOptionsOpen, setSortOptionsOpen] = result.current;

    expect(initialIsSortOptionsOpen).toBe(false);
    expect(setSortOptionsOpen).toBeInstanceOf(Function);

    act(() => setSortOptionsOpen(true));

    const [isSortOptionsOpen] = result.current;

    expect(isSortOptionsOpen).toBe(true);
  });

});
