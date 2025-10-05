import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => {
    return data.draft !== true;
  });
  
  const sortedPosts = blog.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => 
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Securing the Realm - Blog',
    description: 'Epic adventures in cybersecurity, Azure, and AI through the lens of fantasy storytelling.',
    site: context.site || 'https://securing.quest',
    items: sortedPosts.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
