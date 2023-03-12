import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {FungibleESDT, Token, VestingSchedule} from "../../common/types";
import {tr} from "date-fns/locale";
import {getVestingSchedule} from "../../utils/supabase";
import Layout from "../../components/Layout";
import {getTokenData} from "../../apis/chain";
import {denominate} from "../../utils/economics";
import SchedulesTable from "../../components/vesting/SchedulesTable";

export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState<VestingSchedule | null>(null);
    const [loading, setLoading] = useState(true);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [token, setToken] = useState<FungibleESDT>();
    const social = useMemo(() => {
        if (!token?.assets?.social) {return [];}
        return Object.keys(token.assets.social).map(s => {
            // @ts-ignore
            const url = token.assets!.social[s];
            return {
                url,
                platform: s
            }
        })
    }, [token]);
    const fetchProject = async (id: number) => {
        try {
            const project = await getVestingSchedule(id);
            setProject(project);
            setLoading(false);
            console.log(project)
        } catch (e) {
            // todo: handle error
        }
    };
    const fetchTokenData = async (identifier: string) => {
        const token = await getTokenData(identifier);
        setToken(token);
        setTokenLoading(false);
    };

    useEffect(() => {
        if (!router.isReady) {return;}
        const {id} = router.query;
        const _id = Array.isArray(id) ? id[0] : id;
        if (_id) {
            fetchProject(parseInt(_id));
        }
    }, [router]);

    useEffect(() => {
        if (!project) {return;}
        fetchTokenData(project.token_identifier);
    }, [project]);

    return (
        <Layout>
            <div className="px-6 pt-24 lg:px-8">
                {token && <div className="flex flex-col md:flex-row gap-4">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full md:w-1/2">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="flex items-center text-base font-semibold leading-6 text-gray-900 space-x-2">
                                <img
                                    src={token.assets?.pngUrl}
                                    className="w-10 h-10"
                                />
                                <span className="mt-1 max-w-2xl text-sm text-gray-500">
                                    {token.name}
                                </span>
                                <span className="mt-1 max-w-2xl text-sm text-gray-500">
                                    ({token.ticker})
                                </span>
                            </h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Token</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                        {token.identifier}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Supply</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                        {token.supply}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Holders</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                        {token.accounts}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full md:w-1/2">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="flex items-center text-base font-semibold leading-6 text-gray-900 space-x-2">
                                <span className="w-10 h-10"></span>
                                <span className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Summary
                                </span>
                            </h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                        {token.owner}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Circulating</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
                                        {token.circulatingSupply}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-4 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Social</dt>
                                    <dd className="flex items-center flex-wrap gap-3 sm:col-span-3">
                                        {social.map(s => (
                                            <a
                                                key={s.platform}
                                                className="rounded-lg p-1 border border-gray-400 hover:text-indigo-500 hover:border-indigo-500"
                                                href={s.url}
                                            >
                                                {s.platform}
                                            </a>
                                        ))}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                </div>
                }
                {project && token && <div className="mt-6">
                    <SchedulesTable
                        vestingData={project}
                        vestingSchedules={project.vesting_schedule_items!}
                        token={token}
                    />
                </div>
                }
            </div>
        </Layout>
    );

};