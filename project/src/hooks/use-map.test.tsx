import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';
import { City } from '../types/offer';
import { getFakeCity } from '../utils/mock';
import useMap from './use-map';

const getNodeRef = () => ({
  current: document.createElement('div') as HTMLElement,
});
const nullRef = { current: null } as RefObject<HTMLElement | null>;

type HookReturn = ReturnType<typeof useMap>;
type HookTestProps = {
  container: Parameters<typeof useMap>[0];
  city: Parameters<typeof useMap>[1];
};


describe('Hook: useMap', () => {
  it('should return Map if map container and city are given', () => {

    const city: City = getFakeCity();

    const {result: map} = renderHook(() => useMap(getNodeRef(), city));

    expect(map.current).not.toBeNull();

  });

  it('should return null if map container is null', () => {
    const city: City = getFakeCity();

    const { result: map } = renderHook(() => useMap(nullRef, city));

    expect(map.current).toBeNull();
  });

  it('should return null if city is undefined', () => {

    const { result: map } = renderHook(() => useMap(getNodeRef(), undefined));

    expect(map.current).toBeNull();
  });

  it('shuold return Map with first call if city and container are correct', () => {

    const city: City = getFakeCity();

    const { result, rerender } = renderHook<HookReturn, HookTestProps>(
      (props) => useMap(props.container, props.city),
      {
        initialProps: {
          container: getNodeRef(),
          city: city,
        },
      }
    );

    expect(result.current).not.toBeNull();

    rerender({
      container: nullRef,
      city: undefined,
    });

    expect(result.current).not.toBeNull();

  });

});
