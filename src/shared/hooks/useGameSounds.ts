import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

export function useGameSounds() {
	const correctSound = useRef<Audio.Sound | null>(null);
	const wrongSound = useRef<Audio.Sound | null>(null);

	useEffect(() => {
		let mounted = true;

		const setup = async () => {
			// ✅ CRITICAL: allow sound in silent mode
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				allowsRecordingIOS: false,
				staysActiveInBackground: false,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: false,
			});

			const correct = await Audio.Sound.createAsync(
				require("@/assets/sounds/matching-symbol/correct.mp3"),
				{ volume: 1.0 },
			);

			const wrong = await Audio.Sound.createAsync(
				require("@/assets/sounds/matching-symbol/wrong.mp3"),
				{ volume: 1.0 },
			);

			if (!mounted) return;

			correctSound.current = correct.sound;
			wrongSound.current = wrong.sound;
		};

		setup();

		return () => {
			mounted = false;
			correctSound.current?.unloadAsync();
			wrongSound.current?.unloadAsync();
		};
	}, []);

	const playCorrect = async () => {
		if (!correctSound.current) return;
		try {
			await correctSound.current.setPositionAsync(0);
			await correctSound.current.playAsync();
		} catch (e) {
			console.warn("Correct sound error", e);
		}
	};

	const playWrong = async () => {
		if (!wrongSound.current) return;
		try {
			await wrongSound.current.setPositionAsync(0);
			await wrongSound.current.playAsync();
		} catch (e) {
			console.warn("Wrong sound error", e);
		}
	};

	return { playCorrect, playWrong };
}
