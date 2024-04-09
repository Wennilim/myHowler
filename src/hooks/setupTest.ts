import { cleanup } from '@testing-library/react-hooks';
import { afterEach, beforeAll } from 'vitest';

beforeAll(() => {});

afterEach(() => {
	cleanup();
});
