import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AboutSection } from '@/components/AboutSection'
import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'
import { Waveform } from '@/components/Waveform'
import posterImage from '@/images/poster.png'

function YouTubeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 576 512" {...props}>
      <path d="M549.7 124.1c-6.3-23.8-25-42.5-48.9-48.9C458.6 64 288 64 288 64S117.4 64 75.2 75.2c-23.8 6.3-42.5 25.1-48.9 48.9C16 166.3 16 256 16 256s0 89.7 10.3 131.9c6.3 23.8 25 42.5 48.9 48.9C117.4 448 288 448 288 448s170.6 0 212.8-11.2c23.8-6.3 42.5-25 48.9-48.9C560 345.7 560 256 560 256s0-89.7-10.3-131.9zM232 336V176l142.8 80L232 336z" />
    </svg>
  )
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

function GitHubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:px-12 lg:text-sm/7 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            <Link href="https://www.linkedin.com/in/chrislloydjones/" target="_blank">Chris Lloyd-Jones</Link>
            <span aria-hidden="true" className="text-slate-400">
              /
            </span>
            <Link href="https://www.linkedin.com/in/joshmcdonalduk/" target="_blank">Josh McDonald</Link>
          </span>
        </div>
        <div className="relative z-10 mx-auto px-4 pt-10 pb-4 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12">
          <Link
            href="/"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={posterImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">Securing the Realm</Link>
            </p>
            <p className="mt-3 text-lg/8 font-medium text-slate-700">
              Cybersecurity, Azure innovation, and Microsoft AI converge with the enchanting world of tabletop games.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm/7 font-medium text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-indigo-300', 'fill-blue-300']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Elsewhere</span>
            </h2>
            <div className="h-px bg-linear-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base/7 font-medium text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              <li key="YouTubeIcon" className="flex">
                <Link
                  href="https://www.youtube.com/@SecuringTheRealm"
                  className="group flex items-center"
                  aria-label="YouTube"
                  target='_blank'
                >
                  <YouTubeIcon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                  <span className="hidden sm:ml-3 sm:block">YouTube</span>
                </Link>
              </li>
              <li key="LinkedInIcon" className="flex">
                <Link
                  href="https://www.linkedin.com/company/securingtherealm/"
                  className="group flex items-center"
                  aria-label="LinkedIn"
                  target='_blank'
                >
                  <LinkedInIcon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                  <span className="hidden sm:ml-3 sm:block">LinkedIn</span>
                </Link>
              </li>
              <li key="GitHubIcon" className="flex">
                <Link
                  href="https://github.com/SecuringTheRealm"
                  className="group flex items-center"
                  aria-label="GitHub"
                  target='_blank'
                >
                  <GitHubIcon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                  <span className="hidden sm:ml-3 sm:block">GitHub</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute top-0 left-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 sm:py-16 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm/7 font-medium text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm/7 font-bold text-slate-900">
            <Link href="https://www.linkedin.com/in/chrislloydjones/" target="_blank">Chris Lloyd-Jones</Link>
            <span aria-hidden="true" className="text-slate-400">
              /
            </span>
            <Link href="https://www.linkedin.com/in/joshmcdonalduk/" target="_blank">Josh McDonald</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
