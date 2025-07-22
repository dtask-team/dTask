// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Escrow {
    address public client;
    address public freelancer;
    uint256 public amount;
    bool public isReleased;

    constructor(address _freelancer) payable {
        client = msg.sender;
        freelancer = _freelancer;
        amount = msg.value;
        isReleased = false;
    }

    function releaseFunds() external {
        require(msg.sender == client, "Only client can release funds");
        require(!isReleased, "Already released");
        isReleased = true;
        payable(freelancer).transfer(amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}