import { useAuth } from '@elrond-giants/erd-react-hooks/dist';
import {
    Address,
    AddressType,
    AddressValue,
    BigUIntType,
    BigUIntValue,
    ContractFunction,
    Field,
    FieldDefinition,
    Interaction,
    SmartContract,
    Struct,
    StructType,
    TokenPayment,
    U64Type,
    U64Value,
} from '@multiversx/sdk-core/out';
import { Nonce } from '@multiversx/sdk-network-providers/out/primitives';
import BigNumber from 'bignumber.js';

import Header from '../components/Header';
import Layout from '../components/Layout';
import CreateVestingDialog from '../components/vesting/CreateVestingDialog';
import { useTransaction } from '../hooks/useTransaction';

export default function Main() {
  return (
    <Layout>
      <Header />
      <CreateVestingDialog />
    </Layout>
  );
}
