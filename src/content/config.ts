import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const talks = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		event: z.string(),
		videoUrl: z.string().url().optional(),
		slidesUrl: z.string().url().optional(),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
	}),
});

const projects = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		description: z.string(),
		repoUrl: z.string().url(),
		tech: z.array(z.string()).default([]),
		status: z.enum(['active', 'archived', 'experimental']).default('active'),
	}),
});

export const collections = {
	blog,
	talks,
	projects,
};
