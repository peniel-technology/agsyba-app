import { getNextLoopPosition } from '@/features/home/hooks/useAutoCarousel';

describe('getNextLoopPosition', () => {
  it('loops forward through the cloned first slide without animating backwards', () => {
    const secondSlide = getNextLoopPosition(0, 2);
    const clonedFirstSlide = getNextLoopPosition(secondSlide.activeIndex, 2);
    const nextCycle = getNextLoopPosition(clonedFirstSlide.activeIndex, 2);

    expect(secondSlide).toEqual({
      activeIndex: 1,
      shouldResetAfterTransition: false,
      targetIndex: 1,
    });
    expect(clonedFirstSlide).toEqual({
      activeIndex: 0,
      shouldResetAfterTransition: true,
      targetIndex: 2,
    });
    expect(nextCycle.targetIndex).toBe(1);
  });
});
