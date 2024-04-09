import { renderHook, act } from '@testing-library/react-hooks';
import { useClickSound } from './useClickSound';

describe('useClickSound', () => {
	it('should play the click sound when the play function is called', () => {
		const { result } = renderHook(() => useClickSound());
		const { play } = result.current;

		act(() => {
			play();
		});
	});

	it('should stop and play the click sound again when the document is clicked', () => {
		const { result } = renderHook(() => useClickSound());
		const { play } = result.current;

		act(() => {
			play();
		});
	});
});
