import ReactMarkdown from 'react-markdown';

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
}

const IssueCard = ({ issue }: IssueCardProps) => {
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
    </article>
  );
};

export default IssueCard;
