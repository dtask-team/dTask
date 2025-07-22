// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DisputeDAO {
    address public admin;
    string[] public disputes;

    constructor() {
        admin = msg.sender;
    }

    function raiseDispute(string memory description) external {
        disputes.push(description);
    }

    function getDisputes() external view returns (string[] memory) {
        return disputes;
    }
}