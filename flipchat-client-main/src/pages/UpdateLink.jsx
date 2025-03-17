import { useEffect, useState } from "react";
import BackButton from "../components/common/BackButton";
import CreatePremiumLink from "../components/CreatePremiumLink";
import CreateFreeLink from "../components/CreateFreeLink";
import Warning from "../components/common/Warning";
import { useAuthContext } from "../context/AuthContext";
import { PLANS, SERVER_URL } from "../utils/utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Loader from "../components/loader";

const TABS = {
    PREMIUM: "premium",
    FREE: "free",
};

const UpdateLink = () => {
    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState(TABS.PREMIUM);
    const { userDetails } = useAuthContext();
    const handleSwitchTab = (tab) => setCurrentTab(tab);
    const [currentLink, setCurrentLink] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    // fetch link by id
    const fetchLinkById = async (id) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${SERVER_URL}api/link/shortLink/${id}`);
            if (res.data) {
                setCurrentLink(res.data?.link);
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else if (error?.message) {
                toast.error(error?.message);
            } else {
                toast.error("something went wrong");
            }
        } finally {
            setIsLoading(false)
        }
    };

    // set value 
    useEffect(() => {
        if (currentLink) {

        }
    }, [currentLink])

    useEffect(() => {
        if (id) {
            fetchLinkById(id)
        }
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            <Toaster richColors position="top-center" duration={2000} />
            <div className="dashboard">
                <div className="dashboard-header">
                    <div className="dashboard-header-title">
                        <h3 className="dashboard-header-title-normal">Dashboard</h3>
                        <div className="dashboard-header-title-divider"></div>
                        <h3 className="dashboard-header-title-main">Edit Link</h3>
                    </div>
                </div>
                <div className="dashboard-main">
                    <div className="create-container">
                        <div className="create-head">
                            <BackButton />
                        </div>
                        <div className="create-main">
                            {currentLink?.linkType === PLANS.FREE ? <CreateFreeLink link={currentLink} isEdit={true} /> : <CreatePremiumLink link={currentLink} isEdit={true}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateLink;
