import { useContract, useContractRead, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import React, { useEffect, createContext, useContext, useState } from "react";
import emailjs from '@emailjs/browser';

export const AuthorityContext = createContext({});


interface ChildrenType {
    children: React.ReactNode
}

export const AuthorityContextProvider = ({ children }: ChildrenType) => {
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_KEY);
    const [isBallotInitialized, setIsBallotInitialized] = useState<Boolean>();
    const [isVoterRegistered, setIsVoterRegistered] = useState<Boolean>();
    const [isVoterEmailSent, setIsVoterEmailSent] = useState<Boolean>();
    const [isCandidateRegistered, setIsCandidateRegistered] = useState<Boolean>();
    const [selectedElectionData, setSelectedElectionData] = useState({});
    const [allElectionList, setAllElectionList] = useState<any[]>([]);
    //filtered election type
    const [onGoingElection, setOngoingElection] = useState<any[]>([]);
    const [previousElection, setPreviousElection] = useState<any[]>([]);
    const [upComingElection, setUpComingElection] = useState<any[]>([]);


    //All elections
    const { data: electionList, isLoading: isElectionListLoading } = useContractRead(contract, "getElections");


    useEffect(() => {
        //make array empty
        const prev: any[] = [];
        const ongoing: any[] = [];
        const upcoming: any[] = [];

        setAllElectionList(electionList);
        electionList?.forEach((election: any) => {
            //filter election list
            const { startTime, endTime } = election;
            const timeStamp = Date.now();

            if (timeStamp > endTime) {
                setPreviousElection([]);
                prev.push(election)
            } else if (timeStamp < startTime) {
                upcoming.push(election);
            } else {
                ongoing.push(election);
            }
        });

        setPreviousElection(prev);
        setOngoingElection(ongoing);
        setUpComingElection(upcoming);
    }, [electionList])



    //initialize ballot
    const { mutateAsync: createElection, isLoading: isBallotLoading } = useContractWrite(contract, "createElection");
    const initializeBallot = async (value: Object) => {
        try {
            const { name, startTime, endTime } = value
            const data = await createElection({ args: [name, startTime, endTime] });
            setIsBallotInitialized(true);
        } catch (err) {
            setIsBallotInitialized(false);
        }
    }


    //register voters
    const { mutateAsync: registerVoter, isLoading: isVoterRegistrationLoading } = useContractWrite(contract, "registerVoter");

    const registerVoterCall = async (value: Object) => {
        try {
            const { electionID, name, nid, email } = value;
            const data = await registerVoter({ args: [electionID, electionID, name, nid] });
            const emailData = {
                to_email: email,
                from_name: 'Decentralized Voting System',
                to_name: name,
                message: data
            };
            sendEmailWithHash(emailData);
        } catch (err) {
            setIsVoterRegistered(false);
        }


    }

    const sendEmailWithHash = (data: any) => {

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
            data,
            process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
        ).then((result) => {
            setIsVoterEmailSent(true);
        }, (error) => {
            console.log("Email sending error: ", error);
        })
    }

    //register candidates
    const { mutateAsync: registerCandidate, isLoading: isCandidateRegistrationLoading } = useContractWrite(contract, "registerCandidate")
    const registerCandidateCall = async (value: Object, file: File) => {
        try {
            const { name, nid, email, electionID, symbolName } = value;
            const symbolUrl = await uploadFile(file);
            const data = await registerCandidate({ args: [electionID, name, nid, symbolName, symbolUrl] });
            setIsCandidateRegistered(true);
        } catch (err) {
            setIsCandidateRegistered(false);
        }
    }

    //upload file to IPFS
    const { mutateAsync: upload } = useStorageUpload();
    const uploadFile = async (file: File) => {
        const uploadData = [file];
        const uris = await upload({ data: uploadData });
        return uris;
    }


    //selected data
    const setSelectedElection = (data: Object) => {
        setSelectedElectionData(data);
    }

    //get election candidate
    const getElectionCandidate = (electionID: any) => {
        allElectionList?.map((election: any) => {
            const { hash, candidates } = election;
            if (hash == electionID) {
                return candidates;
            }
        })
    }


    return <AuthorityContext.Provider value={{
        previousElection,
        onGoingElection,
        upComingElection,
        isElectionListLoading,
        isBallotInitialized,
        isBallotLoading,
        initializeBallot,
        isVoterRegistered,
        registerVoterCall,
        isVoterRegistrationLoading,
        isVoterEmailSent,
        setIsVoterEmailSent,
        registerCandidateCall,
        isCandidateRegistrationLoading,
        isCandidateRegistered,
        setSelectedElection,
        selectedElectionData,
        getElectionCandidate
    }}>
        {children}
    </AuthorityContext.Provider>
}