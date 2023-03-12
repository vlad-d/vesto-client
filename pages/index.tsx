import Header from '../components/Header';
import Layout from '../components/Layout';
import ProjectsList from '../components/ProjectsList';

export default function Home() {
  return (
    <Layout>
      <Header />
      <ProjectsList />
    </Layout>
  );
}
