import type { Issue } from 'services/issue';

import IssueCard from './IssueCard';
import styles from './IssueList.module.css';

interface IssueListProps {
  issues: Issue[];
}

const IssueList = ({ issues }: IssueListProps) => {
  return (
    <div className={styles.container}>
      {issues.map((issue) => (
        <IssueCard issue={issue} key={issue.id} />
      ))}
    </div>
  );
};

export default IssueList;
