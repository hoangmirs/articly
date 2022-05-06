import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';

import CodeBlock from 'components/CodeBlock';
import type { Issue } from 'services/issue';

import styles from './IssueCard.module.css';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <article className={styles.container}>
      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.title}
      >
        <h2>{issue.title}</h2>
      </a>
      <section className={styles.content}>
        <ReactMarkdown
          components={CodeBlock}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[
            remarkGfm,
            [remarkGithub, { repository: 'hoangmirs/articly' }],
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
