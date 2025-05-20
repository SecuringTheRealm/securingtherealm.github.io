"use client";

import { type FC, useState } from "react";
import styles from "./EpisodePlayButton.module.css";

export interface EpisodePlayButtonProps {
	videoId: string;
}

export const EpisodePlayButton: FC<EpisodePlayButtonProps> = ({ videoId }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.button}
				onClick={() => setOpen((value) => !value)}
				aria-label={open ? "Hide video" : "Play episode"}
			>
				{open ? "Hide Video" : "Play Episode"}
			</button>
			{open && (
				<div className={styles.playerWrapper}>
					<iframe
						className={styles.iframe}
						src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
						title="YouTube player"
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					/>
				</div>
			)}
		</div>
	);
};
