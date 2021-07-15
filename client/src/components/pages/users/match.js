import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import useEth from "../../../contexts/EthContext/useEth";
import Officer from "./admin/officer";
import Manager from "./admin/manager";
import UserDashboard from "./user/userDashboard";

export default function Match() {

    const {state: {contract, accounts}} = useEth();
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        contract.methods.isUserRegistered().call({from: accounts[0]}).then(res => {
            if (res===true){
            contract.methods.currentUser().call({from: accounts[0]}).then(u => {
               setUser(u)
            })
            }else{
                navigate("/register")
            }
        })
    }, [])


    return (<>
            <div className="min-vh-100">
                {user && <>


                </>
                }
            </div>
        </>
    );
}