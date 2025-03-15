"use client"

import { useEffect } from "react";
import { MilitaryUnit } from "../MainMap/MilitaryUnits/types";
import { ConsoleOutputLine } from "./types";

interface ConsoleProps {
    isTimerRunning: boolean;
    currentlySelectedUnit: MilitaryUnit | null;
    simulationSecondsElapsed: number;
    consoleOutput: ConsoleOutputLine[];
    setConsoleOutput: React.Dispatch<React.SetStateAction<ConsoleOutputLine[]>>;
}

const Console: React.FC<ConsoleProps> = ({ isTimerRunning, currentlySelectedUnit, simulationSecondsElapsed,consoleOutput,setConsoleOutput }) => {
    useEffect(() => {
        if (isTimerRunning && currentlySelectedUnit) {
            const newLine: ConsoleOutputLine = {
                text: `zvolená jednotka - ${currentlySelectedUnit?.type} (${currentlySelectedUnit?.affiliation})`,
                time: simulationSecondsElapsed
            };
            setConsoleOutput(prev => {
            const updatedOutput = [...prev, newLine];
            // Max 8 řádků v konzoli
            if (updatedOutput.length > 8) {
                updatedOutput.shift();
            }
            return updatedOutput;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentlySelectedUnit]);

    return (
        <div className="h-[25rem] text-sm">
            {consoleOutput.map((line, index) => (
                <div key={index} className="p-2">čas: {line.time}s - {line.text}</div>
            ))}
        </div>
    );
}

export default Console;