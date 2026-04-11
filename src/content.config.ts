import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// SEO-optimized image alt text
			imageAlt: z.string().optional(),
			// Category for organization
			category: z.string().optional(),
			// Whether the content was AI-generated
			aiGenerated: z.boolean().optional(),
			// Author information
			author: z.object({
				name: z.string(),
				since: z.number().optional(), // Rider since year
				bio: z.string().optional(),
			}).optional(),
		}),
});

export const collections = { blog };
