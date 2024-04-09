import { renderHook, act } from '@testing-library/react-hooks';
import { useSound } from './useSound';
describe('useSound', () => {
	test('should play the sound', () => {
		const { result } = renderHook(() => useSound({ soundSrc: '/sound/song4.mp3' }));
		act(() => {
			result.current.play();
		});
		expect(result.current.isPlaying).toBe(true);
	});

	test('should stop the sound', () => {
		const { result } = renderHook(() => useSound({ soundSrc: '/sound/song4.mp3' }));
		act(() => {
			result.current.play();
			result.current.stop();
		});
		expect(result.current.isPlaying).toBe(false);
	});

	test('should pause the sound', () => {
		const { result } = renderHook(() => useSound({ soundSrc: '/sound/song4.mp3' }));
		act(() => {
			result.current.stop();
			result.current.pause();
		});
		expect(result.current.isPlaying).toBe(false);
	});

});
