import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {VestingSchedule} from "../../common/types";
import {tr} from "date-fns/locale";
import {getVestingSchedule} from "../../utils/supabase";
import Layout from "../../components/Layout";

export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState<VestingSchedule | null>(null);
    const [loading, setLoading] = useState(true);
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
            
        </Layout>
    );

};