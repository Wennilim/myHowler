import { renderHook, act } from '@testing-library/react-hooks';
import { usePlayer } from './usePlayer';

describe('usePlayer', () => {
	it('should toggle play and pause', () => {
		const { result } = renderHook(() => usePlayer(['/sound/song1.mp3']));
		act(() => {
			result.current.togglePlay();
		});
		expect(result.current.isPlaying).toBe(false);
		act(() => {
			result.current.togglePlay();
		});
		expect(result.current.isPlaying).toBe(true);
	});

	it('should toggle loop', () => {
		const { result } = renderHook(() => usePlayer(['/sound/song1.mp3']));
		act(() => {
			result.current.toggleLoop();
		});
		expect(result.current.isLoop).toBe(true);
	});

	it('should stop playback', () => {
		const { result } = renderHook(() => usePlayer(['/sound/song1.mp3']));
		act(() => {
			result.current.togglePlay();
		});
		act(() => {
			result.current.stop();
		});
		expect(result.current.isPlaying).toBe(false);
	});

	it('should change volume', () => {
		const { result } = renderHook(() => usePlayer(['/sound/song1.mp3']));
		act(() => {
			result.current.upVolume();
		});
		expect(result.current.volume).toBe(0.6);
		act(() => {
			result.current.downVolume();
		});
		expect(result.current.volume).toBe(0.5);
	});

	it('should handle seeking', () => {
		const { result } = renderHook(() => usePlayer(['/sound/song1.mp3']));
		act(() => {
			result.current.handleSeek(10);
		});
	});

	it('should play next and previous track', () => {
		const { result } = renderHook(() =>
			usePlayer(['/sound/song1.mp3', '/sound/song2.mp3', '/sound/song3.mp3'])
		);

		if (result.current.currentTrack === '/sound/song1.mp3') {
			act(() => {
				result.current.playNextTrack();
			});
			expect(result.current.currentTrack).toStrictEqual(['/sound/song2.mp3']);
		}
		if (result.current.currentTrack === '/sound/song2.mp3') {
			act(() => {
				result.current.playPreviousTrack();
			});
			expect(result.current.currentTrack).toStrictEqual(['/sound/song1.mp3']);
		}
	});
});
