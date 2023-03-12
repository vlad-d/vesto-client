import {Token, VestingStream} from "../../common/types";
import {useMemo, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Select from "../shared/Select";
import Input from "../shared/Input";
import DatePicker from "../shared/DatePicker";
import CreateStream from "./CreateStream";
import {addMonths} from "date-fns";
import {buildVestingTxInteraction} from "../../utils/transactions";
import {useAuth} from "@elrond-giants/erd-react-hooks/dist";
import {Nonce} from "@multiversx/sdk-network-providers/out/primitives";
import {chainId, network} from "../../config";
import {useTransaction} from "../../hooks/useTransaction";
import Popup from "../shared/Dialog";
import {formatAddress} from "../../utils/presentation";
import {denominate} from "../../utils/economics";

const tokens: Token[] = [
    {
        identifier: "ASTRO-91f2cc",
        balance: "50000000000000000000",
        name: "AstroElrond",
        decimals: 18,
        owner: "asdsad",
        image: ""
    },
    {
        identifier: "TBH-67f97f",
        balance: "50000000000000000000",
        name: "TBH",
        decimals: 18,
        owner: "asdsada",
        image: ""
    }
];

type FormValues = {
    start_date: Date;
    duration: number
    token: string;
    supply: number;
};
type Props = {
    open: boolean;
    setOpen: (value: boolean) => void
}
export default function CreateVestingDialog({open, setOpen}: Props) {
    const {address, nonce, env} = useAuth();
    const {makeTransaction} = useTransaction();
    const formMethods = useForm<FormValues>();
    const {handleSubmit, reset, watch} = formMethods;
    const [loading, setLoading] = useState(false);
    const mapTokenOption = (token: Token) => ({
        id: token.identifier,
        name: token.name,
        icon: <img src={token.image} className="w-5 h-5 rounded-full"/>
    })
    const selectOptions = tokens.map(t => mapTokenOption(t));
    const [streams, setStreams] = useState<VestingStream[]>([]);
    const allocatedSupply = useMemo(() => {
        return streams.reduce((total: number, stream) => {
            total += stream.qty;

            return total;
        }, 0)
    }, [streams]);

    // @ts-ignore
    const startDate = watch("start_date", new Date());
    // @ts-ignore
    const duration = watch("duration", Date.now());
    const supply = watch("supply", 0);
    // @ts-ignore

    const token = watch("token", false);

    const selectedToken = useMemo(() => {
            if (!token) {return;}
            return tokens.find(
                // @ts-ignore
                t => t.identifier === token);
        },
        [token]
    );

    const onSubmitHandler = async (values: FormValues) => {
        const {supply, token} = values;
        setLoading(true);
        const interaction = buildVestingTxInteraction(
            {
                supply,
                token,
                owner: address!,
                streams
            },
            selectedToken!.decimals
        )
            .withNonce(new Nonce(nonce))
            .withGasLimit(500_000_000) //todo: compute gas limit
            .withChainID(chainId!);

        const txResult = await makeTransaction(interaction.buildTransaction());
        setLoading(false);
    }

    const onCreateStream = (stream: VestingStream) => {
        console.log(stream)
        setStreams(streams => [...streams, stream]);
    };

    return (
        <Popup open={open} setOpen={setOpen}>
            <h2 className="text-xl text-gray-900 text-center">
                Create Vesting Schedule
            </h2>
            <FormProvider {...formMethods}>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-3">
                        <form
                            id="vesting-form"
                            className="flex flex-col w-full items-start px-4 gap-y-6"
                            onSubmit={handleSubmit(onSubmitHandler)}
                        >
                            <div className="w-full">
                                <Select
                                    label="Token"
                                    name="token"
                                    selectOptions={selectOptions}
                                    selectedValue={selectedToken ? mapTokenOption(selectedToken) : undefined}
                                    placeholder="Select Token"
                                    options={{
                                        required: true
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <Input
                                    label="Supply"
                                    name="supply"
                                    placeholder="0.00"
                                    type="number"
                                    options={{
                                        required: true
                                    }}
                                />
                            </div>
                            {/*<div className="w-full">*/}
                            {/*    <DatePicker*/}
                            {/*        name="start_date"*/}
                            {/*        initDate={new Date()}*/}
                            {/*        label="Start Date"*/}
                            {/*        options={{*/}
                            {/*            required: true*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="w-full">*/}
                            {/*    <Input*/}
                            {/*        label="Duration (months)"*/}
                            {/*        name="duration"*/}
                            {/*        placeholder=""*/}
                            {/*        type="number"*/}
                            {/*        min="1"*/}
                            {/*        step={1}*/}
                            {/*        options={{*/}
                            {/*            required: true*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <span className="">Recipients</span>
                            <div className="flex flex-col space-y-4 mt-2">
                                {streams.map(stream => (
                                    <div className="flex flex-col w-full space-y-2"
                                         key={stream.recipient}>
                                        <span className="">
                                            {formatAddress(stream.recipient)}
                                        </span>
                                        <div className="flex items-center space-x-3">
                                            <span>{stream.qty} %</span>
                                            <span>
                                                {denominate(stream.amount, 0, 3).toString()} - {selectedToken?.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-start space-y-2">
                                            <span>{new Date(stream.start_date).toUTCString()}</span>
                                            <span>{new Date(stream.end_date).toUTCString()}</span>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </form>
                        {selectedToken && supply && <div className="mt-2">
                            <CreateStream
                                onCreate={onCreateStream}
                                totalSupply={supply}
                                allocatedSupply={allocatedSupply}
                                defaultStartDate={startDate}
                                defaultDuration={duration}
                                token={selectedToken}
                            />
                        </div>
                        }
                        <div className="flex items-center gap-3 flex-row-reverse w-full mt-8">
                            <button
                                type="submit"
                                form="vesting-form"
                                className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create Vesting
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </Popup>
    );
};