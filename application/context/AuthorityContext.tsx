import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import React, { createContext, useContext, useState } from "react";

export const AuthorityContext = createContext({});


interface ChildrenType {
    children: React.ReactNode
}

export const AuthorityContextProvider = ({ children }: ChildrenType) => {
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_KEY);
    const [isBallotInitialized, setIsBallotInitialized] = useState<Boolean>();
    const [isVoterRegistered, setIsVoterRegistered] = useState<Boolean>();


    //All elections
    const { data: electionList, isLoading: isElectionListLoading } = useContractRead(contract, "getElections");


    //initialize ballot
    const { mutateAsync: createElection, isLoading: isBallotLoading } = useContractWrite(contract, "createElection");
    const initializeBallot = async (value: Object) => {
        const { name, startTime, endTime } = value
        try {
            const data = await createElection({ args: [name, startTime, endTime] });
            setIsBallotInitialized(true);
        } catch (err) {
            setIsBallotInitialized(false);
        }
    }


    //register voters
    const { mutateAsync: registerVoter, isLoading: isVoterRegistrationLoading } = useContractWrite(contract, "registerVoter");

    const registerVoterCall = async (value: Object) => {
        const { electionID, name, nid, email } = value;
        try {
            const data = await registerVoter({ args: [electionID, electionID, name, nid] });
            sendEmailWithHash(data);
        } catch (err) {
            setIsVoterRegistered(false);
        }
    }

    const sendEmailWithHash = (data: any) => {

    }




    return <AuthorityContext.Provider value={{
        electionList,
        isElectionListLoading,
        isBallotInitialized,
        isBallotLoading,
        initializeBallot,
        isVoterRegistered,
        registerVoterCall,
        isVoterRegistrationLoading

    }}>
        {children}
    </AuthorityContext.Provider>
}