let provider;
        let signer;
        let contract;

        async function connectWallet() {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const network = await provider.getNetwork();
            const contractAddress = "0x27c9cCF9824f1930363e75c944FBDA58Be3F8818"; // Replace with your deployed contract address
            const abi = [
                [
                    {
                        "inputs": [],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "_name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "_patientId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "_walletAddress",
                                "type": "address"
                            }
                        ],
                        "name": "addPatientRecord",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "_name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "_patientId",
                                "type": "uint256"
                            }
                        ],
                        "name": "addPatientRecord",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "admin",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "patients",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "patientId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "balance",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "walletAddress",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_patientId",
                                "type": "uint256"
                            }
                        ],
                        "name": "receiveFunds",
                        "outputs": [],
                        "stateMutability": "payable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "totalPatients",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_patientId",
                                "type": "uint256"
                            }
                        ],
                        "name": "viewPatientRecord",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_amount",
                                "type": "uint256"
                            }
                        ],
                        "name": "withdrawFunds",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ]
]; // Replace with your contract ABI

            contract = new ethers.Contract(contractAddress, abi, signer);
        }

        async function viewPatientRecord() {
            const patientId = document.getElementById("patientId").value;
            try {
                const patient = await contract.viewPatientRecord(patientId);
                document.getElementById("patientInfo").textContent = `Name: ${patient[0]}, Patient ID: ${patient[1]}, Balance: ${patient[2]}`;
            } catch (error) {
                alert("Error: Unauthorized access or patient not found.");
            }
        }

        async function makeDonation() {
            const patientId = document.getElementById("patientId").value;
            const donationAmount = document.getElementById("donationAmount").value;
            try {
                const tx = await contract.receiveFunds(patientId, { value: ethers.utils.parseEther(donationAmount) });
                await tx.wait();
                alert("Donation successful!");
            } catch (error) {
                alert("Error: Unauthorized access or invalid patient ID.");
            }
        }

        async function withdrawFunds() {
            try {
                const tx = await contract.withdrawFunds();
                await tx.wait();
                alert("Funds withdrawn successfully!");
            } catch (error) {
                alert("Error: Only admin can withdraw funds.");
            }
        }

        async function addPatient() {
    const patientName = document.getElementById("patientName").value;
    try {
        const tx = await contract.addPatientRecord(patientName);
        await tx.wait();
        alert("Patient added successfully!");
    } catch (error) {
        alert("Error: Unable to add patient.");
    }
}