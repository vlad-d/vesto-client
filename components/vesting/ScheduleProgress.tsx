import {VestingScheduleItem} from "../../common/types";
import ProgressBar from "../ProgressBar";

const computeProgress = (startDate: Date, endDate: Date): number => {
    if (new Date() < startDate) {return 0;}
    if (new Date() > endDate) {return 100;}

    const totalTime = endDate.getTime() - startDate.getTime();
    const elapsedTime = new Date().getTime() - startDate.getTime();

    return elapsedTime / totalTime * 100;

};
export default function ScheduleProgress({schedule}: { schedule: VestingScheduleItem; }) {
    return (
        <ProgressBar value={computeProgress(
            new Date(schedule.start_time),
            new Date(schedule.end_time)
        )}/>
    );
};