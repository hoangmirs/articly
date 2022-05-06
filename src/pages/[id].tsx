import { GetServerSideProps } from 'next';
import Link from 'next/link';

import IssueCard from 'components/Issue/IssueCard';
import {
  getIssueQuery,
  graphQLClient,
  Issue,
  searchIssueNumberQuery,
} from 'services/issue';
import styles from 'styles/Home.module.css';

interface IssueProps {
  issue: Issue;
}

const Issue = ({ issue }: IssueProps) => {
  return (
    <main className={styles.main}>
      <Link href="/">
        <h1 className={styles.title}>TIL</h1>
      </Link>

      <IssueCard issue={issue} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let { id } = query;

  if (id === undefined) {
    return { props: {} };
  }

  if (isNaN(Number(id))) {
    const {
      search: { nodes },
    } = await graphQLClient.request(searchIssueNumberQuery, {
      query: `repo:${process.env.REPO_OWNER}/${process.env.REPO_NAME} ${id}`,
    });

    if (nodes.length > 0) {
      id = nodes[0].number;
    }
  }

  const {
    repository: { issue },
  } = await graphQLClient.request(getIssueQuery, {
    owner: process.env.REPO_OWNER,
    name: process.env.REPO_NAME,
    number: Number(id),
  });

  return {
    props: {
      id,
      issue: issue as Issue,
    },
  };
};

export default Issue;
