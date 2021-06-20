import React, {Component, useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

export default function EthLoaded() {
    const {state} = useEth()
    return <div>
        {
            !state.artifact ? <NoticeNoArtifact/> :
                !state.contract ? <NoticeWrongNetwork/> :
                    <Outlet/>
        }
    </div>
};