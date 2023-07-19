import { EmailJSResponseStatus } from "@emailjs/browser";
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import React, { createContext, useContext, useState } from "react";
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




    return <AuthorityContext.Provider value={{
        electionList,
        isElectionListLoading,
        isBallotInitialized,
        isBallotLoading,
        initializeBallot,
        isVoterRegistered,
        registerVoterCall,
        isVoterRegistrationLoading,
        isVoterEmailSent,
        setIsVoterEmailSent

    }}>
        {children}
    </AuthorityContext.Provider>
}