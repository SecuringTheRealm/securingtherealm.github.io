'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm/7 font-medium text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base/7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
        Through epic storytelling and engaging demos, we transform complex topics like deploying Large-Language Models (LLMs), Small-Language Models (SLMs), and Agentic AI into adventurous quests.

        Dive into technical architectures that showcase secure and scalable AI solutions, learn how to build robust systems for modern applications, and explore the practical challenges of security, performance, and collaboration—wrapped in the magic of role-playing games. Whether you're a seasoned tech adventurer or a curious newcomer, you'll gain insights into Azure’s cutting-edge capabilities, responsible AI practices, and open-source projects—all while battling kobolds, training AI elves, and unlocking the secrets of the Crystal Keep.

        Embark on a journey where technology meets adventure, and together, we’ll secure the realm! 
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
