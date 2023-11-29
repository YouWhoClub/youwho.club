import Web3 from "web3";
import { Buffer } from 'buffer';

const generateSignature = (privateKey, data) => {
    // Infura provider endpoint
    const provider =
        "https://polygon-mainnet.infura.io/v3/20f2a17bd46947669762f289a2a0c71c";

    // Create Web3 Provider with the specified endpoint
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    // Convert private key to buffer
    const privateKeyBuffer = Buffer.from(privateKey, "hex");

    // Convert data object to string and hash it
    const dataString = JSON.stringify(data);
    const dataHash = web3.utils.keccak256(dataString);

    // Sign the data hash with the private key and Extract the signature from the sign object
    const signObject = web3.eth.accounts.sign(dataHash, privateKeyBuffer);
    const { signature } = signObject;

    // Prepare the request data with the computed signature and hashed data
    const requestData = {
        ...data,
        tx_signature: signature.replace("0x", ""),
        hash_data: dataHash.replace("0x", ""),
    };

    // Recover the public key from the data hash and signature
    const publicKey = web3.eth.accounts.recover(dataHash, signature);

    return { signObject, requestData, publicKey };
};

export default generateSignature;
