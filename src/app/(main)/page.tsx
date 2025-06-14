import Link from 'next/link'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { MarkdownDescription } from '@/components/MarkdownDescription'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { type Episode, getAllEpisodes } from '@/lib/episodes'

function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)

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
            <Link href={`${episode.url}`} target='_blank'>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm/7 text-slate-500"
          />
          <MarkdownDescription
            description={episode.description}
            className="mt-1 text-base/7 text-slate-700"
          />
          
          {/* YouTube Embed */}
          <div className="mt-4 w-full max-w-2xl">
            <YouTubeEmbed 
              url={episode.url} 
              title={episode.title}
              className="aspect-video"
            />
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <Link
              href={`${episode.url}`}
              target='_blank'
              className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Watch episode ${episode.title} on YouTube`}
            > 
              <PlayIcon className="h-2.5 w-2.5 fill-current"  aria-hidden="true" />&nbsp;Open on YouTube
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export default async function Home() {
  let episodes = await getAllEpisodes()

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl/7 font-bold text-slate-900">Episodes</h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {episodes.map((episode) => (
          <EpisodeEntry key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}

export const revalidate = 10
