import {useFormContext} from 'react-hook-form';
import {AiFillExclamationCircle} from 'react-icons/ai';


import {classNames} from '../../utils/presentation';

/**
 * This component is using useFormContext hook from "react-hook-form" to get the form context
 * https://react-hook-form.com/api/useformcontext
 */

interface IInput {
    autocomplete?: string;
    events?: {
        [key: string]: (e: any) => void;
    };
    label: string;
    name: string;
    options?: any;
    placeholder: string;
    prefix?: string;
    type?: string;
    [key: string]: any;
}

export default function Input(
    {
        autocomplete,
        name,
        options = {},
        label,
        placeholder,
        type = "text",
        prefix,
        events = {},
       ...props
    }: IInput
) {
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const id = `${name}-id`;

    if ("required" in options) {
        options["required"] = "This field is required!";
    }

    return (
        <div className="">
            <label htmlFor={id}
                   className="block font-semibold text-xs text-indigo-500 dark:text-indigo-600 uppercase mb-2">
                {label}
            </label>
            <div
                className={classNames(
                    "flex relative border focus-within:ring-1",
                    !!errors[name]
                        ? "border-red-300 focus-within:ring-red-500"
                        : "border-theme-border dark:border-theme-border-dark focus-within:ring-indigo-500"
                )}
            >
                {!!prefix && <span
                    className="inline-flex items-center pl-2 pr-1 text-light-blue text-sm">{prefix}</span>}
                <input
                    id={id}
                    type={type}
                    className={classNames(
                        !!errors[name] ? "text-red-900" : "",
                        "bg-white p-1.5 flex-1 block w-full focus:outline-none text-gray-900 border-0 focus-within:ring-0 autofill:bg-transparent font-medium text-sm"
                    )}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                    {...register(name, options)}
                    {...events}
                    {...props}
                />
                {!!errors[name] && (
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AiFillExclamationCircle className="h-5 w-5 text-red-500"
                                                 aria-hidden="true"/>
                    </div>
                )}
            </div>
            {/* @ts-ignore */}
            {!!errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>}
        </div>
    );
}
