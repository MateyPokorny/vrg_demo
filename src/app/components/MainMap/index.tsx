"use client";

import { useState } from "react";
import "ol/ol.css";
import ModalDialog from "../ModalDialog";
import LayoutStyle from "./types";
import HeaderBar from "../HeaderBar";
import { roundDistance } from "./utils";
import InfoSideBar from "../InfoSideBar";
import useMap from "./customHooks/useMap";

const MainMap: React.FC = () => {

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [measuredDistance, setMeasuredDistance] = useState<number>(0);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(LayoutStyle.PANELS_RIGHT);
  const { mapRef, map, drawMeasuredLine, currentlySelectedUnit, setCurrentlySelectedUnit } = useMap(setMeasuredDistance, setIsModalOpen);

  const toggleDrawInteraction = (): void => {
    if (map && drawMeasuredLine) {
      if (isDrawing) {
        map.removeInteraction(drawMeasuredLine);
      } else {
        map.addInteraction(drawMeasuredLine);
      }
      setIsDrawing(!isDrawing);
    }
  };

  const toggleLayoutStyle = (): void => {
    setLayoutStyle((prevStyle: LayoutStyle) =>
      prevStyle === LayoutStyle.PANELS_RIGHT ? LayoutStyle.PANELS_LEFT : LayoutStyle.PANELS_RIGHT
    );
  };

  return (
    <>
      <HeaderBar isDrawing={isDrawing} toggleDrawInteraction={toggleDrawInteraction} toggleLayout={toggleLayoutStyle} layoutStyle={layoutStyle} />
      <div className="grid grid-cols-4">
        <div className={`h-full relative col-span-3 h-screen order-last ${layoutStyle === LayoutStyle.PANELS_RIGHT ? "order-first" : "order-last"}`}>
          <div ref={mapRef} className="h-full"></div>
          <ModalDialog
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title="Změřená vzdálenost:"
            content={`${roundDistance(measuredDistance)} KM`}
          />
        </div>

        <InfoSideBar
          layoutStyle={layoutStyle}
          currentlySelectedUnit={currentlySelectedUnit}
          setCurrentlySelectedUnit={setCurrentlySelectedUnit}
        />
      </div>
    </>
  );
};

export default MainMap;