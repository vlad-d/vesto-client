import {FungibleESDT, VestingSchedule, VestingScheduleItem} from "../../common/types";
import {Address} from "@multiversx/sdk-core/out";
import {useAuth} from "@elrond-giants/erd-react-hooks/dist";
import ScheduleProgress from "./ScheduleProgress";
import {formatDistance} from "date-fns"

export default function SchedulesTable(
    {
        vestingData,
        vestingSchedules,
        token
    }: {
        vestingSchedules: VestingScheduleItem[],
        vestingData: VestingSchedule,
        token: FungibleESDT
    }
) {
    const {address, authenticated} = useAuth();

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Streams</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the vesting schedules.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Address
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Amount
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Progress
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Starts on
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Ends in
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {vestingSchedules.map((vesting) => (
                                <tr key={`${vesting.vesting_schedule_id}-${vesting.stream_id}`}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="flex items-center">
                                            {Address.fromHex(vesting.address).bech32()}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div className="text-gray-900">{vesting.amount}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <ScheduleProgress schedule={vesting}/>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {new Date(vesting.start_time).toUTCString()}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {formatDistance(new Date(vesting.end_time), new Date())}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                        {authenticated && address === Address.fromHex(vesting.address).bech32() &&
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Claim
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};