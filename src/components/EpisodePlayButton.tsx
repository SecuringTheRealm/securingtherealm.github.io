"use client";

import { type FC, useState } from "react";

export interface EpisodePlayButtonProps {
	videoId: string;
}

export const EpisodePlayButton: FC<EpisodePlayButtonProps> = ({ videoId }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col items-start">
			{open ? (
				<>
					<button
						type="button"
						className="flex items-center text-sm leading-6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
						onClick={() => setOpen(false)}
						aria-label="Hide video"
					>
						Hide Video
					</button>
					<div className="mt-2 w-full aspect-video">
						<iframe
							className="h-full w-full"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							title="YouTube player"
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					</div>
				</>
			) : (
				<button
					type="button"
					className="flex items-center text-sm leading-6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
					onClick={() => setOpen(true)}
					aria-label="Play episode"
				>
					Play Episode
				</button>
			)}
		</div>
	);
};
