// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Healthcare {
    struct Patient {
        string name;
        uint256 patientId;
        uint256 balance;
        address walletAddress;
    }

    mapping(uint256 => Patient) public patients;
    uint256 public totalPatients;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addPatientRecord(string memory _name, uint256 _patientId, address _walletAddress) external onlyAdmin {
        patients[_patientId] = Patient(_name, _patientId, 0, _walletAddress);
    }

    function viewPatientRecord(uint256 _patientId) external view returns (string memory, uint256, uint256) {
        require(msg.sender == patients[_patientId].walletAddress, "Unauthorized access");
        Patient memory patient = patients[_patientId];
        return (patient.name, patient.patientId, patient.balance);
    }

    function receiveFunds(uint256 _patientId) external payable {
        patients[_patientId].balance += msg.value;
    }

    function withdrawFunds(uint256 _amount) external onlyAdmin {
        require(_amount <= address(this).balance, "Insufficient contract balance");
        payable(admin).transfer(_amount);
    }

    function addPatientRecord(string memory _name, uint256 _patientId) public {
        require(bytes(_name).length > 0, "Patient name cannot be empty");
        require(patients[_patientId].walletAddress == address(0), "Patient ID already exists");
        patients[_patientId] = Patient({
            name: _name,
            patientId: _patientId,
            balance:0,
            walletAddress: msg.sender
        });


        totalPatients++;
    }
    

    
}

