import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Complaint} from "../../Complaint";
import useEth from "../../../../contexts/EthContext/useEth";

export default function MyComplaints() {
    const navigate = useNavigate()
    const {state} = useEth()
    const {state: {contract, accounts}} = useEth();
    const [complaints, setComplaints] = useState([])

    useEffect(() => {
        contract.methods.readComplaintsCount().call({from: accounts[0]}).then(res => {
            const count = parseInt(res)
            let index = 1;
            setComplaints([])
            while (index<=count){
                contract.methods.getComplaint(index).call({from: accounts[0]}).then(res => {
                    const complaint = {
                        id: res.id,
                        title: res.title,
                        address: res.complainantAddress,
                        complaint: res.complaint,
                        details: res.details,
                        progress: res.progress,
                        date: new Date(res.date * 1000),
                        numDoc: res.numDoc
                    }
                    if(complaint.address == accounts[0]){
                        setComplaints(complaints => [...complaints, complaint])
                    }
                })
                index++;
            }
        })
    }, [accounts, contract.methods])
    

    function viewDetails(complaint) {
        navigate('../.././details', {state: complaint});
    }

    return (
        <div className="min-vh-100">
        <div className=" card-body text-center">Complaints</div>
        <div className="container-fluid">
            <div className="p-2 row py-4">
                {complaints.map((complaint) => {
                    return <div className="col-md-6 col-lg-6 col-xl-4 my-2" key={complaint.id}>
                        <div className="card text-black" style={{minHeight:"150px"}}>
                            <div className="card-body">
                                <div className="text-center">
                                    <h5 className="card-title">{complaint.title}</h5>
                                    <p className="text-muted mb-4">{complaint.details}</p>
                                </div>
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <span>Date: </span><span>{complaint.date.toDateString()}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                     <button onClick={() => viewDetails(complaint)} className="btn btn-primary"><span>View Progress</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        </div>
    );
}
