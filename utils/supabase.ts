import {createClient} from "@supabase/supabase-js";
import {VestingSchedule} from "../common/types";
import {da} from "date-fns/locale";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUB_KEY!
);

export const getVestingSchedules = async (): Promise<VestingSchedule[]> => {
    const {data, error} = await supabase.from("vesting_schedule")
        .select("*, vesting_schedule_items(*)");

    if (error || !data) {return [];}

    return data as VestingSchedule[];
};

export const getVestingSchedule = async (id: number): Promise<VestingSchedule> => {
    const {data, error} = await supabase.from("vesting_schedule")
        .select("*, vesting_schedule_items(*)")
        .eq("id", id)
        .maybeSingle();

    if (error) {throw  error;}
    if (!data) {throw new Error("Not Found");}

    return data as VestingSchedule;
};