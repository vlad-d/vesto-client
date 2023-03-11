import {Token, VestingStream} from "../../common/types";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../shared/Input";
import DatePicker from "../shared/DatePicker";
import {useMemo} from "react";
import {denominate} from "../../utils/economics";
import { addMonths } from 'date-fns'

type Props = {
    allocatedSupply: number;
    totalSupply: number;
    onCreate: (stream: VestingStream) => void;
    defaultStartDate: Date;
    defaultDuration: number;
    token: Token;
};

type FormValues = {
    start_date: Date;
    duration: number;
    recipient: string;
    qty: number;
};
export default function CreateStream(
    {
        allocatedSupply,
        totalSupply,
        onCreate,
        defaultStartDate,
        defaultDuration,
        token
    }: Props
) {
    const formMethods = useForm<FormValues>();
    const {handleSubmit, reset, watch} = formMethods;
    const onSubmitHandler = (values: FormValues) => {
        const {start_date, duration, recipient, qty} = values;

        onCreate({
            start_date: start_date.getDate(),
            end_date: addMonths(start_date, duration).getDate(),
            recipient,
            qty,
            amount: (qty / 100) * totalSupply
        });

        reset();
    };

    const qty = watch("qty", 0);
    const amount = useMemo(() =>{
        return denominate((qty / 100) * totalSupply, 0, 5).toString()
    }, [qty, totalSupply]);


    return (
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col w-full items-start px-4 gap-y-8 border border-gray-500 p-2 rounded-md"
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Input
                    label="Recipient"
                    name="recipient"
                    placeholder=""
                    options={{
                        required: true
                    }}
                />
                <div className="flex items-center space-x-2">
                    <Input
                        label="Quantity (%)"
                        name="qty"
                        placeholder=""
                        type="number"
                        min="1"
                        max={100 - allocatedSupply}
                        step={1}
                        options={{
                            required: true
                        }}
                    />
                    <span>{amount}</span>
                </div>
                <DatePicker
                    name="start_date"
                    initDate={defaultStartDate}
                    label="Start Date"
                    options={{
                        required: true
                    }}
                />
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
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => reset()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add
                    </button>
                </div>
            </form>
        </FormProvider>
    );

};