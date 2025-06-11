import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import type { Episode } from "../lib/episodes";
import { Container } from "./Container";
import { EpisodePlayButton } from "./EpisodePlayButton";
import { FormattedDate } from "./FormattedDate";

function getVideoId(url: string): string {
	try {
		const parsed = new URL(url);
		if (parsed.hostname === "youtu.be") {
			return parsed.pathname.slice(1);
		}
		return parsed.searchParams.get("v") ?? "";
	} catch (error) {
		console.error("Failed to parse video URL", url, error);
		return "";
	}
}

export const EpisodeEntry: FC<{ episode: Episode }> = ({ episode }) => {
	const date = new Date(episode.published);
	return (
		<article
			aria-labelledby={`episode-${episode.id}-title`}
			className="py-10 sm:py-12"
		>
			<Container>
				<div className="flex flex-col items-start">
					<h2
						id={`episode-${episode.id}-title`}
						className="mt-2 text-lg font-bold text-slate-900"
					>
						<a href={episode.url} target="_blank" rel="noreferrer">
							{episode.title}
						</a>
					</h2>
					<FormattedDate
						date={date}
						className="order-first font-mono text-sm leading-7 text-slate-500"
					/>
					<ReactMarkdown className="prose mt-1 text-slate-700">
						{episode.description}
					</ReactMarkdown>
					<div className="mt-4 flex flex-col items-start gap-2">
						<EpisodePlayButton videoId={getVideoId(episode.url)} />
						<a
							href={episode.url}
							target="_blank"
							rel="noreferrer"
							className="flex items-center text-sm leading-6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
							aria-label={`Watch episode ${episode.title} on YouTube`}
						>
							Open on YouTube
						</a>
					</div>
				</div>
			</Container>
		</article>
	);
};
