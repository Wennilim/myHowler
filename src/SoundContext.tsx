import React, { createContext, useContext } from 'react';
import useSound, { UseSoundReturn } from './hooks/useSound';

interface SoundContextType {
	soundInstances: UseSoundReturn[] | null;
}

const SoundContext = createContext<SoundContextType>({ soundInstances: null });

export const SoundProvider: React.FC<{ soundSrcList: string[]; children: React.ReactNode }> = ({
	soundSrcList,
	children,
}) => {
	const soundInstances = useSound({ soundSrcList });

	return <SoundContext.Provider value={{ soundInstances }}>{children}</SoundContext.Provider>;
};

export const useSoundContext = (): UseSoundReturn[] | null => {
	const { soundInstances } = useContext(SoundContext);
	return soundInstances;
};
