import { useEffect, useState } from 'react';

import { VestingSchedule } from '../common/types';
import { denominate } from '../utils/economics';
import { getVestingSchedules } from '../utils/supabase';

export default function ProjectsList() {
  const [vestings, setVestings] = useState<VestingSchedule[]>([]);
  useEffect(() => {
    (async () => {
      const vestings = await getVestingSchedules();
      console.log(vestings);

      setVestings(vestings);
    })();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Token
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vesting Allocation
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Streams No.
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vestings.map((item) => (
                  <tr key={item.id} className="hover:cursor-pointer">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={item.token_metadata.assets?.svgUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{item.token_metadata.name}</div>
                          <div className="text-gray-500">{item.token_identifier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {denominate(item.deposit, item.token_metadata.decimals).toString()} {item.token_metadata.ticker}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">{item.vesting_schedule_items?.length}</div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        View
                      </a>
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
