import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Token, VestingSchedule} from "../../common/types";
import {tr} from "date-fns/locale";
import {getVestingSchedule} from "../../utils/supabase";
import Layout from "../../components/Layout";
import {getTokensData} from "../../apis/chain";

export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState<VestingSchedule | null>(null);
    const [loading, setLoading] = useState(true);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [token, setToken] = useState<Token>();
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
        const tokens = await getTokensData([identifier]);
        setToken(tokens[0]);
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

    return (
        <Layout>
            <div className="px-6 pt-24 lg:px-8">
                {token && <div className="flex flex-col md:flex-row gap-4">
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full md:w-1/2">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="flex items-center text-base font-semibold leading-6 text-gray-900">
                                <img src={token.image}/>
                                <span className="mt-1 max-w-2xl text-sm text-gray-500"></span>
                            </h3>
                        </div>
                    </div>
                </div>
                }
            </div>
        </Layout>
    );

};