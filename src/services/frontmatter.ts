import matter from 'gray-matter';

const parseFrontmatter = (content: string) => {
  const { data } = matter(content);

  return data;
};

export { parseFrontmatter };
