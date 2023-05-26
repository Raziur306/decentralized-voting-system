const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers, hardhatArguments } = require("hardhat");


describe("Election Contract", () => {
    async function deployElectionFixture() {
        const Election = await ethers.getContractFactory("ElectionContract");
        const { owner, addr1 } = await ethers.getSigners();
        const hardhatElection = await Election.deploy();
        await hardhatElection.deployed();
        return { Election, hardhatElection, owner, addr1 };
    }

    //temporary variable for testing
    //election
    const _electionName = "Test Election";
    const _startTime = 1685164789;
    const _endTime = 1685251189;

    //candidate
    const _electionID = 0;
    const _candidateName = "Test Candidate";
    const _candidateNid = 6546546546;
    const _candidateSymbolName = "Egg";
    const _symbolImg = 'Test Url';

    //candidate
    const _voterName = "Md Raziur Rahaman Ronju";
    const _voterNid = 1235487954;

    it("Election must be created with proper information.", async () => {
        const { owner, hardhatElection } = await loadFixture(deployElectionFixture);
        await hardhatElection.createElection(_electionName, _startTime, _endTime);
        const allElections = await hardhatElection.getElections();

        expect(allElections[0].name).to.equal(_electionName);
        expect(allElections[0].startTime).to.equal(ethers.BigNumber.from(_startTime));
        expect(allElections[0].endTime).to.equal(ethers.BigNumber.from(_endTime.toString()));
    });

    it("Candidate Registration", async () => {
        const { owner, hardhatElection } = await loadFixture(deployElectionFixture);
        await hardhatElection.createElection(_electionName, _startTime, _endTime);

        await hardhatElection.registerCandidate(_electionID, _candidateName, _candidateNid, _candidateSymbolName, _symbolImg);
        const allElections = await hardhatElection.getElections();

        expect(allElections[0].candidates[0].name).to.equal(_candidateName);
        expect(allElections[0].candidates[0].nid).to.equal(_candidateNid);
        expect(allElections[0].candidates[0].symbolName).to.equal(_candidateSymbolName);
        expect(allElections[0].candidates[0].symbolImg).to.equal(_symbolImg);

    });


    it("Voter Registration", async () => {
        const { owner, hardhatElection } = await loadFixture(deployElectionFixture);
        await hardhatElection.createElection(_electionName, _startTime, _endTime);
        await hardhatElection.registerCandidate(_electionID, _candidateName, _candidateNid, _candidateSymbolName, _symbolImg);



        //register voter
        const hash = await hardhatElection.callStatic.registerVoter(_electionID, _voterName, _voterNid);
        await hardhatElection.registerVoter(_electionID, _voterName, _voterNid);

        const allElections = await hardhatElection.getElections();
        expect(allElections[0].voters[0].nid).to.equal(_voterNid);
        expect(allElections[0].voters[0].hash).to.equal(hash);

    });


    it("Give Vote", async () => {
        const { owner, hardhatElection } = await loadFixture(deployElectionFixture);
        await hardhatElection.createElection(_electionName, _startTime, _endTime);

        await hardhatElection.registerCandidate(_electionID, _candidateName, _candidateNid, _candidateSymbolName, _symbolImg);

        //register voter
        const hash = await hardhatElection.callStatic.registerVoter(_electionID, _voterName, _voterNid);
        await hardhatElection.registerVoter(_electionID, _voterName, _voterNid);

        let allElections = await hardhatElection.getElections();
        //giving votes 
        await hardhatElection.giveVote(_electionID, hash, allElections[0].candidates[0].hash);

        allElections = await hardhatElection.getElections();

        expect(allElections[0].candidates[0].votes).to.equal(1);
    });




});
