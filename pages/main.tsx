import Header from '../components/Header';
import Layout from '../components/Layout';
import CreateVestingDialog from '../components/vesting/CreateVestingDialog';
import {useState} from "react";

export default function Main() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
  return (
    <Layout>
      <Header onAction={() => setShowCreateDialog(true)} />
      <CreateVestingDialog open={showCreateDialog} setOpen={setShowCreateDialog} />
    </Layout>
  );
}
