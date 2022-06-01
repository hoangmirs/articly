import ReactMarkdown from 'react-markdown';

import Giscus from '@giscus/react';
import Link from 'next/link';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';

import CodeBlock from 'components/CodeBlock';
import { getIssueId, Issue } from 'services/issue';

import styles from './IssueCard.module.css';

interface IssueCardProps {
  issue: Issue;
  isDetail?: boolean;
}

const IssueCard = ({ issue, isDetail }: IssueCardProps) => {
  const renderGiscus = () => {
    if (isDetail) {
      return (
        <Giscus
          id="comments"
          repo="hoangmirs/articly"
          repoId="R_kgDOHR5C9Q"
          category="Giscus"
          categoryId="DIC_kwDOHR5C9c4CPOOu"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      );
    }
  };

  return (
    <article className={styles.container}>
      <Link href={`/[id]`} as={`/${getIssueId(issue)}`}>
        <h2 className={styles.title}>{issue.title}</h2>
      </Link>
      <Link href={issue.url}>
        <a href={issue.url}>View issue on Github</a>
      </Link>
      <section className={styles.content}>
        <ReactMarkdown
          components={CodeBlock}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[
            remarkGfm,
            remarkFrontmatter,
            [
              remarkGithub,
              {
                repository: `${process.env.REPO_OWNER}/${process.env.REPO_NAME}`,
              },
            ],
          ]}
        >
          {issue.body}
        </ReactMarkdown>
      </section>
      <section className={styles.footer}>
        <div>
          {issue.labels.nodes.map((label) => (
            <span key={label.id} className={styles.label}>
              #{label.name}
            </span>
          ))}
        </div>
        <div className={styles.authorDetail}>
          <strong>{issue.author.login}</strong>
          <time className={styles.createdAt}>
            &nbsp;
            {new Date(issue.createdAt).toLocaleString()}
          </time>
        </div>
      </section>
      {renderGiscus()}
    </article>
  );
};

export default IssueCard;
