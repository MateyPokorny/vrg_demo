"use client"

import { useEffect } from "react";
import { MilitaryUnit } from "../MainMap/MilitaryUnits/types";
import { ConsoleOutputLine } from "../Console/types";

interface SimulationControlPanelProps {
    isRunning: boolean;
    simulationSecondsElapsed: number;
    setSimulationSecondsElapsed: React.Dispatch<React.SetStateAction<number>>;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentlySelectedUnit: (unit: MilitaryUnit | null) => void;
    setConsoleOutput: React.Dispatch<React.SetStateAction<ConsoleOutputLine[]>>;
}

const SimulationControlPanel: React.FC<SimulationControlPanelProps> = ({ isRunning, setIsRunning, simulationSecondsElapsed, setSimulationSecondsElapsed, setCurrentlySelectedUnit, setConsoleOutput }) => {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                setSimulationSecondsElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, setSimulationSecondsElapsed]);

    const handleStartOrResume = () => {
        if (!isRunning && simulationSecondsElapsed > 0) {
            setIsRunning(true);
            return;
        }

        setSimulationSecondsElapsed(0);
        setCurrentlySelectedUnit(null);
        setConsoleOutput([]);

        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    }

    const handleStop = () => {
        setSimulationSecondsElapsed(0);
        setConsoleOutput([]);
        setIsRunning(false);
    }

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        onClick={handleStartOrResume}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                    </button>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        onClick={handlePause}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-btn" viewBox="0 0 16 16">
                            <path d="M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                        </svg>
                    </button>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        onClick={handleStop}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                    </button>

                </div>

                <p className="text-xl">Čas: {simulationSecondsElapsed} s</p>

            </div>
        </>
    );
}

export default SimulationControlPanel;
