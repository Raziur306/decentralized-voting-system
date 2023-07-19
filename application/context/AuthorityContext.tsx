import { useContract, useContractWrite } from "@thirdweb-dev/react";
import React, { createContext, useContext, useState } from "react";

export const AuthorityContext = createContext({});


interface ChildrenType {
    children: React.ReactNode
}

export const AuthorityContextProvider = ({ children }: ChildrenType) => {
    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_KEY);
    const [isBallotInitialized, setIsBallotInitialized] = useState<Boolean>();


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




    return <AuthorityContext.Provider value={{
        isBallotInitialized,
        isBallotLoading,
        initializeBallot,
    }}>
        {children}
    </AuthorityContext.Provider>
}