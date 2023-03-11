import AdminLayout from "../components/AdminLayout";
import CreateVestingDialog from "../components/vesting/CreateVestingDialog";
import {useTransaction} from "../hooks/useTransaction";
import {
    Address, AddressType, AddressValue, BigUIntType, BigUIntValue,
    BinaryCodec, ContractFunction, EnumValue,
    Field, FieldDefinition,
    Interaction,
    SmartContract, StringType,
    Struct, StructType, TokenPayment, U64Type, U64Value
} from "@multiversx/sdk-core/out";
import {StructBinaryCodec} from "@multiversx/sdk-core/out/smartcontracts/codec/struct";
import BigNumber from "bignumber.js";
import {Nonce} from "@multiversx/sdk-network-providers/out/primitives";
import {useAuth} from "@elrond-giants/erd-react-hooks/dist";

export default function Main() {
    const {nonce} = useAuth();
    const {makeTransaction} = useTransaction();
    const makeTx = async () => {
        const contract = new SmartContract(
            {address: new Address("erd1qqqqqqqqqqqqqpgqqsja3a4nu9u3l4d0m77ys947nka2cjwflpzqrzz8sc")}
        );
        const structTypeStream = new StructType("BuildingAttributes", [

            new FieldDefinition("recipient", "address", new AddressType()),
            new FieldDefinition("deposit", "deposit", new BigUIntType()),
            new FieldDefinition("start_time", "start time", new U64Type()),
            new FieldDefinition("end_time", "end time", new U64Type()),
        ]);

        const struct = new Struct(structTypeStream, [
            new Field(new AddressValue(new Address("erd1gz6jzgpkjjalg4gzmrks087t8mc872nu0ldehy6euhtmr589s0lq6k440l")), "recipient"),
            new Field(new BigUIntValue(4000000000000000000), "deposit"),
            new Field(new U64Value(1678544921 * 1000), "start_time"),
            new Field(new U64Value(1678554921 * 1000), "end_time"),
        ])
        const args = [struct]
        const interaction = new Interaction(
            contract,
            new ContractFunction("createVestingSchedule"),
            args
        )
            .withSingleESDTTransfer(TokenPayment.fungibleFromAmount(
                    "TBH-67f97f",
                    new BigNumber(5),
                    18
                )
            )
            .withNonce(new Nonce(nonce))
            .withGasLimit(500_000_000) //todo: compute gas limit
            .withChainID("D");

        const tx = interaction.buildTransaction();
        const txResult = await makeTransaction(tx)
        console.log(txResult);
    };
    return (
        <AdminLayout>
            <CreateVestingDialog/>
            <button onClick={makeTx}>
                Make tx
            </button>

        </AdminLayout>
    );
};