// @ts-ignore
import moment from 'moment';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FungibleESDT } from '../../common/types';
import { denominate } from '../../utils/economics';
import DatePicker from '../shared/DatePicker';
import Input from '../shared/Input';

type Props = {
  allocatedSupply: number;
  totalSupply: number;
  onCreate: (stream: any) => void;
  defaultStartDate: Date;
  defaultDuration: number;
  token: FungibleESDT;
};

type FormValues = {
  start_date: Date;
  duration: number;
  recipient: string;
  qty: number;
};
export default function CreateStream({
  allocatedSupply,
  totalSupply,
  onCreate,
  defaultStartDate,
  defaultDuration,
  token,
}: Props) {
  const formMethods = useForm<FormValues>();
  const { handleSubmit, reset, watch } = formMethods;
  const onSubmitHandler = (values: FormValues) => {
    console.log(values);
    const { start_date, duration, recipient, qty } = values;
    onCreate({
      start_date: start_date,
      end_date: moment(start_date).add(duration, "months").toDate(),
      recipient,
      qty,
      amount: (qty / 100) * totalSupply,
    });

    reset();
  };

  const qty = watch("qty", 0);
  const amount = useMemo(() => {
    return denominate((qty / 100) * totalSupply, 0, 5).toString();
  }, [qty, totalSupply]);

  return (
    <FormProvider {...formMethods}>
      <form
        id="stream-form"
        className="flex flex-col w-full items-start px-4 gap-y-8 border border-gray-200 p-2 rounded-md"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="w-full">
          <Input
            label="Recipient"
            name="recipient"
            placeholder=""
            options={{
              required: true,
            }}
          />
        </div>
        <div className="flex items-center space-x-3 w-full">
          <div className="w-full">
            <Input
              label="Quantity - %"
              name="qty"
              placeholder=""
              type="number"
              min="1"
              max={100 - allocatedSupply}
              step={1}
              options={{
                required: true,
              }}
            />
          </div>
          <div className="w-full">
            <span className="block font-semibold text-xs text-indigo-500 dark:text-indigo-600 uppercase mb-2">
              Amount - {token.name}
            </span>
            <span className="flex items-center justify-center bg-gray-100 text-indigo-500 p-1.5">{amount}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <DatePicker
            name="start_date"
            initDate={defaultStartDate}
            label="Start Date"
            options={{
              required: true,
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
              required: true,
            }}
          />
        </div>
        <div className="flex items-center gap-3 flex-row-reverse w-full">
          <button type="submit" className="font-semibold text-indigo-500 hover:text-indigo-600" form="stream-form">
            Add
          </button>
          <button type="button" className="font-semibold text-gray-500 hover:text-gray-600" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
