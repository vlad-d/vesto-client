import { useMemo } from 'react';

interface IProgressBarProps {
    value: number;
    w?: string;
    h?: string;
    color?: string;
}

export default function ProgressBar({ value, h = "2", w = "32", color = "secondary" }: IProgressBarProps) {
    console.log(value)
    const finalValue = useMemo(() => {
        return Math.min(value, 100).toString();
    }, [value]);
    return (
        <div className={`w-${w} h-${h} bg-indigo-300 rounded-full`}>
            <div className={`h-${h} bg-indigo-600 rounded-full`} style={{ width: `${finalValue}%` }}></div>
        </div>
    );
}