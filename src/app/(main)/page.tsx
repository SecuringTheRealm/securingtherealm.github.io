import Link from 'next/link'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { MarkdownDescription } from '@/components/MarkdownDescription'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { type Episode, getAllEpisodes } from '@/lib/episodes'

function EpisodeEntry({ episode }: { episode: Episode }) {
  const date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className='py-10 sm:py-12'
    >
      <Container>
        <div className='flex flex-col items-start'>
          <h2
            id={`episode-${episode.id}-title`}
            className='mt-2 text-lg font-bold text-slate-900'
          >
            <Link href={`${episode.url}`} target='_blank'>
              {episode.title}
            </Link>
          </h2>
          <FormattedDate
            date={date}
            className='order-first font-mono text-sm/7 text-slate-500'
          />
          <MarkdownDescription
            description={episode.description}
            className='mt-1 text-base/7 text-slate-700'
          />

          {/* YouTube Embed */}
          <div className='mt-4 w-full max-w-2xl'>
            <YouTubeEmbed
              url={episode.url}
              title={episode.title}
              className='aspect-video'
            />
          </div>
        </div>
      </Container>
    </article>
  )
}

export default async function Home() {
  const episodes = await getAllEpisodes()

  return (
    <div className='pt-16 pb-12 sm:pb-4 lg:pt-12'>
      <Container>
        <h1 className='text-2xl/7 font-bold text-slate-900'>Episodes</h1>
      </Container>
      <div className='divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100'>
        {episodes.map((episode) => (
          <EpisodeEntry key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}

export const revalidate = 10
