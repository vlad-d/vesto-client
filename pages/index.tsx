import { useState } from 'react';

import Header from '../components/Header';
import Layout from '../components/Layout';
import ProjectsList from '../components/ProjectsList';
import CreateVestingDialog from '../components/vesting/CreateVestingDialog';

export default function Home() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  return (
    <Layout>
      <Header onAction={() => setShowCreateDialog(true)} />
      <ProjectsList />

      <CreateVestingDialog open={showCreateDialog} setOpen={setShowCreateDialog} />
    </Layout>
  );
}
