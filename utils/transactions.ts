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
    List,
    SmartContract,
    Struct,
    StructType,
    TokenPayment,
    U64Type,
    U64Value,
} from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

import { VestingType } from '../common/types';

const structTypeStream = new StructType("BuildingAttributes", [
  new FieldDefinition("recipient", "address", new AddressType()),
  new FieldDefinition("deposit", "deposit", new BigUIntType()),
  new FieldDefinition("start_time", "start time", new U64Type()),
  new FieldDefinition("end_time", "end time", new U64Type()),
]);

export const buildVestingTxInteraction = (vesting: VestingType, tokenDecimals: number) => {
  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS),
  });

  const args = vesting.streams.map(
    (stream) =>
      new Struct(structTypeStream, [
        new Field(new AddressValue(new Address(stream.recipient)), "recipient"),
        new Field(new BigUIntValue(stream.qty), "deposit"),
        new Field(new U64Value(stream.start_date * 1000), "start_time"),
        new Field(new U64Value(stream.end_date * 1000), "end_time"),
      ])
  );

  return new Interaction(contract, new ContractFunction("createVestingSchedule"), [
    new List(structTypeStream, args),
  ]).withSingleESDTTransfer(
    TokenPayment.fungibleFromAmount(vesting.token, new BigNumber(vesting.supply), tokenDecimals)
  );
};
