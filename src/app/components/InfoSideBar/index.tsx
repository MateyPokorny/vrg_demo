"use client";

import InfoPanel from "../InfoPanel";
import SimulationControlPanel from "../SimulationControlPanel";
import LayoutStyle from "../MainMap/types";
import { MilitaryUnit } from "../MainMap/MilitaryUnits/types";
import Console from "../Console";
import { useState } from "react";
import { ConsoleOutputLine } from "../Console/types";

interface InfoSideBarProps {
    layoutStyle: LayoutStyle;
    currentlySelectedUnit: MilitaryUnit | null;
    setCurrentlySelectedUnit: (unit: MilitaryUnit | null) => void;
}

const InfoSideBar: React.FC<InfoSideBarProps> = ({layoutStyle,currentlySelectedUnit,setCurrentlySelectedUnit}) => {

    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [simulationSecondsElapsed, setSimulationSecondsElapsed] = useState(0);
    const [consoleOutput, setConsoleOutput] = useState<ConsoleOutputLine[]>([]);

    return (
        <div className={`col-span-1 h-screen flex flex-col divide-y-2 border-x-2 border-gray-950 divide-gray-950 ${layoutStyle === LayoutStyle.PANELS_LEFT ? "order-first" : "order-last"}`}>
            <InfoPanel panelName="Simulace">
                <SimulationControlPanel 
                    isRunning={isTimerRunning}
                    setIsRunning={setIsTimerRunning}
                    simulationSecondsElapsed={simulationSecondsElapsed}
                    setSimulationSecondsElapsed={setSimulationSecondsElapsed}
                    setCurrentlySelectedUnit={setCurrentlySelectedUnit}
                    setConsoleOutput={setConsoleOutput}
                    />
            </InfoPanel>
            <InfoPanel panelName="Informace o jednotce">
                {currentlySelectedUnit ? (
                    <div className="flex flex-col p-2 gap-2 justify-center items-center">
                        <div><span className="font-semibold">Typ jednotky:</span> {currentlySelectedUnit.type}</div>
                        <div><span className="font-semibold">Morálka:</span> {currentlySelectedUnit.morale}</div>
                        <div><span className="font-semibold">Zkušenost jednotky:</span> {currentlySelectedUnit.experience}</div>
                        <div><span className="font-semibold">Stav munice:</span> {currentlySelectedUnit.ammo}</div>
                        <div className="text-center mt-2"><span className="font-semibold">bojová efektivita:</span></div>
                        <div style={{ height: "10px", background: "#919191", width: "100%" }}><div style={{ background: "#1572fd", height: "100%", width: `${currentlySelectedUnit.combatEffectiveness}%` }}></div></div>
                    </div>
                ) : (
                    <div className="text-center p-2">Vyberte jednotku z mapy</div>
                )}
            </InfoPanel>
            <InfoPanel panelName="Konzole">
                <Console simulationSecondsElapsed={simulationSecondsElapsed} isTimerRunning={isTimerRunning} currentlySelectedUnit={currentlySelectedUnit} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
            </InfoPanel>
        </div>
    )
}

export default InfoSideBar