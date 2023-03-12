import Link from 'next/link';
import {useEffect, useState} from 'react';

import {VestingSchedule} from '../common/types';
import {denominate} from '../utils/economics';
import {projectPath} from '../utils/routes';
import {getVestingSchedules, supabase} from '../utils/supabase';

export default function ProjectsList() {
  const [vestings, setVestings] = useState<VestingSchedule[]>([]);

  const loadVesting = async () => {
    const vestings = await getVestingSchedules();
    setVestings(vestings);
  };
  useEffect(() => {
    loadVesting();
  }, []);

  useEffect(() => {
    const channel = supabase
        .channel("db-messages")
        .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "vesting_schedule",
            },
            () => {
              console.log("event is here")
              loadVesting();
            }
        )
        .subscribe();

    return () => {
      channel.unsubscribe();
    };

  }, [])
  return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                <tr>
                  <th scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Token
                  </th>
                  <th scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vesting Allocation
                  </th>
                  <th scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Streams No.
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vestings.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0 hover:cursor-pointer">
                      <Link href={projectPath(item.id)}>
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={item.token_metadata.assets?.svgUrl} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{item.token_metadata.name}</div>
                            <div className="text-gray-500">{item.token_identifier}</div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {denominate(item.deposit, item.token_metadata.decimals).toString()} {item.token_metadata.ticker}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">{item.vesting_schedule_items?.length}</div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 text-indigo-600 hover:text-indigo-900">
                      <Link href={projectPath(item.id)}>View</Link>
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
}
