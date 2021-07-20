import React, {Component, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useEth from "../../../../contexts/EthContext/useEth";


export default function AddComplaint() {
    const [image, setImage] = useState()
    const [error, setError] = useState(null)
    const navigation = useNavigate()
    const {state: {contract, accounts}} = useEth();
    const addComplaintBtnClicked = (event) => {
        event.preventDefault();
        const data = {
            title: event.target[0].value,
            complaint: event.target[1].value,
            complainant: event.target[2].value,
            contact: event.target[3].value,
        };
        contract.methods.createComplaint(data.title, data.complainant, data.complaint, data.contact).send({from: accounts[0]}).then(res => {
            if(!alert("Complaint added")){
                window.location.reload(false)
            }
        })
        console.log(data)
    }

   const changeImage = (event) => {
        setImage(event.target.files[0])
    }
        return (
            <div>
                <h1 className="text-center">Add Complaint</h1>
                <div className="w-50" style={{margin: "auto"}}>
                    <form onSubmit={addComplaintBtnClicked}>
                        <div className="align-items-center g-3">
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputTitle">Title</label>
                                <input type="text" className="form-control w-100" id="inputTitle" required placeholder="Title"/>
                            </div>
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputDescription">Details</label>
                                <textarea className="form-control" id="inputDescription"
                                       placeholder="Details" name="description" rows="3" required/>
                            </div>
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputSize">Complainant</label>
                                <input type="text" className="form-control" name="location" id="inputSize"
                                       placeholder="Your name" required/>
                            </div>
                            <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="contact">Contact</label>
                                <input type="text" className="form-control" name="contact" id="inputSize"
                                       placeholder="Your Contact" required/>
                            </div>
                            {false && <div className="col-auto form-group">
                                <label className="visually-hidden" htmlFor="inputImage">Image</label>
                                <input type="file" className="form-control" id="inputImage"
                                       placeholder="Image" required onChange={changeImage}/>
                            </div>}
                            <div className="col-auto form-group">
                                {error && <label className="visually-hidden alert-warning" htmlFor="inputImage">{error}</label>}
                            </div>


                            <div className="col-auto">
                                <button type="submit" onSubmit={addComplaintBtnClicked} className="btn btn-primary">Post Complaint</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}
