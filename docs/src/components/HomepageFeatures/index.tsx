import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Type-Safe Hooks',
    emoji: '🔷',
    description: (
      <>
        Built with TypeScript. Get fully-typed responses for posts, pages, 
        media, users, and categories with IntelliSense support.
      </>
    ),
  },
  {
    title: 'React Hooks API',
    emoji: '⚛️',
    description: (
      <>
        Modern hooks like <code>usePosts</code>, <code>useMedia</code>, and 
        <code> useGraphQLPosts</code> make fetching WordPress data feel native to React.
      </>
    ),
  },
  {
    title: 'REST + GraphQL',
    emoji: '🔌',
    description: (
      <>
        Support for both WordPress REST API and WPGraphQL. Use whichever query 
        language fits your project, or mix both seamlessly.
      </>
    ),
  },
  {
    title: 'JWT & OAuth Auth',
    emoji: '🔐',
    description: (
      <>
        Built-in JWT and OAuth authentication with automatic token refresh. 
        Secure your API requests without writing boilerplate code.
      </>
    ),
  },
  {
    title: 'Smart Caching',
    emoji: '⚡',
    description: (
      <>
        Powered by TanStack Query for intelligent caching, automatic refetching, 
        and pagination support. Your app stays fast and responsive.
      </>
    ),
  },
  {
    title: 'CLI Tools',
    emoji: '💻',
    description: (
      <>
        Configure environment variables, test authentication, and validate your 
        WordPress endpoints with a simple CLI.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>{emoji}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}