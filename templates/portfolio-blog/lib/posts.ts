import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    
    // Create a sample post
    const samplePost = `---
title: "Welcome to Your New Blog"
date: "2024-01-01"
excerpt: "This is your first blog post. You can edit this file or create new ones in the posts directory."
---

# Welcome to Your New Blog

This is your first blog post! You can edit this file or create new ones in the \`posts\` directory.

## Getting Started

To create a new post:

1. Create a new \`.md\` file in the \`posts\` directory
2. Add frontmatter with title, date, and excerpt
3. Write your content in Markdown

## Markdown Support

This blog supports full Markdown syntax:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- Lists
- And much more!

Happy blogging! 🎉
`;
    
    fs.writeFileSync(path.join(postsDirectory, 'welcome.md'), samplePost);
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: name.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: data.date || '2024-01-01',
        excerpt: data.excerpt || '',
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '2024-01-01',
      excerpt: data.excerpt || '',
      content,
    };
  } catch (error) {
    return null;
  }
}

