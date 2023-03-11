import {useFormContext} from "react-hook-form";
import {AiFillExclamationCircle} from "react-icons/ai";
import ReactDatePicker from "react-datepicker"
import {useEffect, useState} from "react";

interface IInput {
    label: string;
    name: string;
    initDate: Date;
    options?: any;
}
export default function DatePicker({label, name, options, initDate}: IInput) {
    const {
        setValue,
        formState: {errors},
        register,
    } = useFormContext();

    const [date, setDate] = useState(initDate);

    const id = `${name}-id`;
    if ("required" in options) {
        options["required"] = "This field is required!";
    }

    const onChange = (value: Date) => {
        setValue(name, value);
        setDate(value);
    };

    register(name, options);

    useEffect(() => {
        onChange(initDate);
    }, [])

    return (
        <div className="relative">
            <label htmlFor={id}
                   className="block font-semibold text-xs text-primary dark:text-primary-dark uppercase mb-2">
                {label}
            </label>
            <ReactDatePicker
                onChange={onChange}
                selected={date}
            />

            {!!errors[name] && (
                <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                    <AiFillExclamationCircle className="h-5 w-5 text-red-500" aria-hidden="true"/>
                </div>
            )}

            {/* @ts-ignore */}
            {!!errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>}
        </div>
    );
};