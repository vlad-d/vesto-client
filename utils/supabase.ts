import {createClient} from "@supabase/supabase-js";
import {VestingSchedule} from "../common/types";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY!
);

export const getVestingSchedules = async (address: string): VestingSchedule[] => {
    const {data, error} = await supabase.from("vesting_schedule")
        .select("*, vesting_schedule_items(*)")
        .eq("vesting_schedule_items.address", address);
    if (error || !data) {return [];}

    return data;
};