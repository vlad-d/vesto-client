import Header from '../components/Header';
import Layout from '../components/Layout';
import CreateVestingDialog from '../components/vesting/CreateVestingDialog';

export default function Main() {
  return (
    <Layout>
      <Header />
      <CreateVestingDialog />
    </Layout>
  );
}
