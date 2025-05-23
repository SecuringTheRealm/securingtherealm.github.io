"use client";

import { useEffect, useRef, useState } from "react";

import { useAudioPlayer } from "@/components/AudioProvider";
import { ForwardButton } from "@/components/player/ForwardButton";
import { MuteButton } from "@/components/player/MuteButton";
import { PlayButton } from "@/components/player/PlayButton";
import { PlaybackRateButton } from "@/components/player/PlaybackRateButton";
import { RewindButton } from "@/components/player/RewindButton";
import { Slider } from "@/components/player/Slider";

function parseTime(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	const remaining = seconds - hours * 3600 - minutes * 60;
	return [hours, minutes, remaining];
}

function formatHumanTime(seconds: number) {
	const [h, m, s] = parseTime(seconds);
	return `${h} hour${h === 1 ? "" : "s"}, ${m} minute${
		m === 1 ? "" : "s"
	}, ${s} second${s === 1 ? "" : "s"}`;
}

export function AudioPlayer() {
	const player = useAudioPlayer();

	const wasPlayingRef = useRef(false);

	const [currentTime, setCurrentTime] = useState<number | null>(
		player.currentTime,
	);

	useEffect(() => {
		setCurrentTime(null);
	}, []);

	if (!player.episode) {
		return null;
	}

	return (
		<div className="flex items-center gap-6 bg-white/90 px-4 py-4 ring-1 shadow-sm shadow-slate-200/80 ring-slate-900/5 backdrop-blur-xs md:px-6">
			<div className="hidden md:block">
				<PlayButton player={player} />
			</div>
			<div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
				<a
					href={`/${player.episode.id}`}
					className="truncate text-center text-sm leading-6 font-bold md:text-left"
					title={player.episode.title}
				>
					{player.episode.title}
				</a>
				<div className="flex justify-between gap-6">
					<div className="flex items-center md:hidden">
						<MuteButton player={player} />
					</div>
					<div className="flex flex-none items-center gap-4">
						<RewindButton player={player} />
						<div className="md:hidden">
							<PlayButton player={player} />
						</div>
						<ForwardButton player={player} />
					</div>
					<Slider
						label="Current time"
						maxValue={player.duration}
						step={1}
						value={[currentTime ?? player.currentTime]}
						onChange={([value]) => setCurrentTime(value)}
						onChangeEnd={([value]) => {
							player.seek(value);
							if (wasPlayingRef.current) {
								player.play();
							}
						}}
						numberFormatter={{ format: formatHumanTime } as Intl.NumberFormat}
						onChangeStart={() => {
							wasPlayingRef.current = player.playing;
							player.pause();
						}}
					/>
					<div className="flex items-center gap-4">
						<div className="flex items-center">
							<PlaybackRateButton player={player} />
						</div>
						<div className="hidden items-center md:flex">
							<MuteButton player={player} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
