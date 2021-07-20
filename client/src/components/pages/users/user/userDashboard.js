import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import AddComplaint from "./AddComplaint";
import Complaints from "../admin/complaints";
import MyComplaints from "./complaints";

export default function UserDashboard() {
    const [tab, setTab] = useState(0)
    const navigation = useNavigate()
    useEffect(() => {

    }, [])

    return (<>
            <nav className="nav nav-pills nav-justified p-2">
                <button onClick={() => setTab(0)} className={tab === 0 ? "mx-2 nav-link active" : "nav-link"}
                        aria-current="page">Add New Complaint
                </button>
                <button onClick={() => setTab(1)} className={tab === 1 ? "mx-2 nav-link active" : "nav-link"}>My Complaints
                </button>
            </nav>
            {tab === 0 && <AddComplaint/>}
            {tab === 1 && <MyComplaints/>}
        </>
    );
}