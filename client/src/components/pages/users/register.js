import React, {useState} from 'react';
import useEth from "../../../contexts/EthContext/useEth";
import {create} from 'ipfs-http-client';
import {useNavigate} from "react-router-dom";

export default function Register() {
    const {state: {contract, accounts}} = useEth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [interests, setInterests] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const navigate = useNavigate()

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const url = await uploadToIPFS(file); // Implement this function for IPFS uploading
        setProfilePicture(url);
    };

    const register = (event) => {
        event.preventDefault();
        // Call the smart contract method
        contract.methods.registerUser(username, email, bio, gender, interests, profilePicture)
            .send({ from: accounts[0] })
            .then(res => {
                if(!alert("User Registered!")){
                    navigate("/dashboard")
                }
            }).catch(err => {
                alert(err)
        });
    };

    return (
        <div className={"min-vh-100"}>
            <form onSubmit={register}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)}></textarea>
                <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />
                <input type="text" placeholder="Interests (comma-separated)" value={interests} onChange={e => setInterests(e.target.value.split(','))} />
                <input type="file" onChange={handleImageUpload} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}


async function uploadToIPFS(file) {
    try {
        const ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        });
        const fileForIpfs = new FormData();
        fileForIpfs.append('file', file);
        const added = await ipfs.add(file);
        return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (error) {
        console.error('Error uploading file to IPFS', error);
        throw error;
    }
}