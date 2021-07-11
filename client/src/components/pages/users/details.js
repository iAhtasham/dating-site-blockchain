import React, {Component, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useEth from "../../../contexts/EthContext/useEth";
import {useLocation} from "react-router";


export default function Details() {
    const [error, setError] = useState(null)
    const navigation = useNavigate()
    const {state: {contract, accounts}} = useEth();
    const location = useLocation();
    const complaint = location.state
    const [files, setFiles] = useState([])

    if (!complaint) {

    }

    useEffect(() => {
        let i = 0;
        setFiles([])
        console.log(parseInt(complaint.numDoc))
        while (i < parseInt(complaint.numDoc)) {
            i++;
            contract.methods.getDocument(complaint.id, i).call({from: accounts[0]}).then(res => {
                console.log(res)
                setFiles(files => [...files, {name: res.name, url: res.url}])
            })

        }
    }, [])
    console.log(complaint)
    console.log(files)
    return (
        <div>
            <h1 className="text-center">Complaint Details</h1>
            <div className="w-50" style={{margin: "auto"}}>
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="align-items-center g-3">
                        <div className="col-auto form-group">
                            <label className="visually-hidden" htmlFor="inputTitle">Title</label>
                            <input type="text" disabled value={complaint.id} className="form-control w-100"
                                   id="inputTitle" required placeholder="Title"/>
                        </div>
                        <div className="col-auto form-group">
                            <label className="visually-hidden" htmlFor="inputDescription">Details</label>
                            <textarea className="form-control" id="inputDescription"
                                      placeholder="Details" disabled value={complaint.details} name="description"
                                      rows="3"/>
                        </div>

                        <div className="col-auto form-group">
                            <label className="visually-hidden" htmlFor="inputSize">Complainant</label>
                            <input type="text" className="form-control" name="location" id="inputSize"
                                   placeholder="Complainant" disabled value={complaint.complainant}/>
                        </div>

                        <div className="col-auto form-group">
                            <h3>Progress</h3>
                            <label className="visually-hidden" htmlFor="inputDescription">Details</label>
                            <textarea className="form-control" id="inputDescription"
                                      placeholder="Details" disabled value={complaint.progress} name="description"
                                      rows="3"/>
                        </div>
                        <div className="col-auto form-group">
                            <label className="visually-hidden" htmlFor="inputDescription">Files</label>
                            <div className="form-control" id="inputDescription"
                            >
                                {files.map(file => <div>
                                        <a href={file.url}>{file.name}</a>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
