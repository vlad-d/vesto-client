import {Token, VestingStream} from "../../common/types";
import {useMemo, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Select from "../shared/Select";
import Input from "../shared/Input";
import DatePicker from "../shared/DatePicker";
import CreateStream from "./CreateStream";
import {addMonths} from "date-fns";

const tokens: Token[] = [
    {
        identifier: "ASTRO-91f2cc",
        balance: "50000000000000000000",
        name: "AstroElrond",
        decimals: 18,
        owner: "asdsad",
        image: ""
    }
];

type FormValues = {
    start_date: Date;
    duration: number
    token: string;
    supply: number;
};

export default function CreateVestingDialog() {
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

    const startDate = watch("start_date", Date.now());
    const endDate = watch("end_date", Date.now());
    const supply = watch("supply", 0);
    const token = watch("token", false);

    const selectedToken = useMemo(() => {
            if (!token) {return;}
            return tokens.find(
                t => t.identifier === token);
        },
        [token]
    );

    const onSubmitHandler = (values: FormValues) => {
        const {start_date, duration, supply, token} = values;
        const endDate = addMonths(start_date, duration);
        setLoading(true);


    }

    const onCreateStream = (stream: VestingStream) => {
        setStreams(streams => [...streams, stream]);
    };

    return (
        <FormProvider {...formMethods}>
            <div className="max-w-screen-sm">
                <form
                    className="flex flex-col w-full items-start px-4 gap-y-8"
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
                    <div className="w-full">
                        <DatePicker
                            name="start_date"
                            initDate={new Date()}
                            label="Start Date"
                            options={{
                                required: true
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            label="Duration (months)"
                            name="duration"
                            placeholder=""
                            type="number"
                            min="1"
                            step={1}
                            options={{
                                required: true
                            }}
                        />
                    </div>
                </form>
                <div className="flex flex-col space-y-6">
                    {streams.map(stream => (
                        <div className="flex flex-col" key={stream.recipient}>
                            <span className="">{stream.recipient}</span>
                            <div className="flex items-center space-x-3">
                                <span>{stream.qty} %</span>
                                <span>{stream.amount}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span>{stream.start_date}</span>
                                <span>{stream.end_date}</span>
                            </div>
                        </div>
                    ))}

                </div>
                {selectedToken && supply && <div className="mt-4">
                    <CreateStream
                        onCreate={onCreateStream}
                        totalSupply={supply}
                        allocatedSupply={allocatedSupply}
                        defaultStartDate={startDate}
                        defaultEndDate={endDate}
                        token={selectedToken}
                    />
                </div>
                }
            </div>
        </FormProvider>
    );
};