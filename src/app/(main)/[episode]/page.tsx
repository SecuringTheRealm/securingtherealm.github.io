import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { MarkdownDescription } from '@/components/MarkdownDescription'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { getAllEpisodes } from '@/lib/episodes'

const getEpisode = cache(async (id: string) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id.toString() === id)

  if (!episode) {
    notFound()
  }

  return episode
})

export async function generateStaticParams() {
  const episodes = await getAllEpisodes()
  
  return episodes.map((episode) => ({
    episode: episode.id.toString(),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const resolvedParams = await params
  let episode = await getEpisode(resolvedParams.episode)

  return {
    title: episode.title,
  }
}

export default async function Episode({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const resolvedParams = await params
  let episode = await getEpisode(resolvedParams.episode)
  let date = new Date(episode.published)

  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex items-start gap-6">
            <div className="flex flex-col flex-1">
              <h1 className="text-4xl font-bold text-slate-900">
                {episode.title}
              </h1>
              <FormattedDate
                date={date}
                className="mt-2 font-mono text-sm/7 text-slate-500"
              />
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href={episode.url}
                  target='_blank'
                  className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
                  aria-label={`Watch episode ${episode.title} on YouTube`}
                >
                  <svg className="h-2.5 w-2.5 fill-current mr-1" aria-hidden="true" viewBox="0 0 10 10">
                    <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                  </svg>
                  Open on YouTube
                </Link>
              </div>
            </div>
          </div>
          <MarkdownDescription
            description={episode.description}
            className="mt-6 text-lg/8 font-medium text-slate-700"
          />
        </header>
        
        {/* YouTube Embed */}
        <div className="mt-8">
          <YouTubeEmbed 
            url={episode.url} 
            title={episode.title}
            className="aspect-video max-w-4xl"
          />
        </div>
        
        <hr className="my-12 border-gray-200" />
        <div
          className="prose mt-14 prose-slate [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm/7 [&>h2]:font-medium [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: episode.content }}
        />
      </Container>
    </article>
  )
}
