import { useEffect, useRef, useState } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import { LineString, Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Icon } from 'ol/style';
import { getLength } from 'ol/sphere';
import { DrawEvent } from 'ol/interaction/Draw';
import mockData from '../../MilitaryUnits/mockData';
import { MilitaryUnit } from '../../MilitaryUnits/types';

//Custom hook pro operace s mapou aby byl komponenta mapy přehlednější

const useMap = (setMeasuredDistance: (distance: number) => void, setIsModalOpen: (isOpen: boolean) => void) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);
    const [drawMeasuredLine, setDrawMeasuredLine] = useState<Draw | null>(null);
    const [currentlySelectedUnit, setCurrentlySelectedUnit] = useState<MilitaryUnit | null>(null);

    const handleUnitClick = (unit: MilitaryUnit) => {
        setCurrentlySelectedUnit(unit);
    }

    useEffect(() => {
        if (!mapRef.current) return;

        const lineVectorSource = new VectorSource();
        const unitMarkersVectorSource = new VectorSource();
        const lineVectorLayer = new VectorLayer({
            source: lineVectorSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'rgb(218, 98, 0)',
                    width: 2,
                    lineDash: [10, 5],
                }),
            }),
        });
        const unitMarkersLayer = new VectorLayer({
            source: unitMarkersVectorSource,
        });

        const mapInstance = new Map({
            target: mapRef.current as HTMLElement,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                lineVectorLayer,
                unitMarkersLayer
            ],
            view: new View({
                center: fromLonLat([37.8724, 48.5632]),
                zoom: 11,
            }),
        });

        // Vykreslení jednotek na mapu
        mockData.forEach((unit: MilitaryUnit) => {
            const unitMarker = new Feature({
                geometry: new Point(fromLonLat([unit.position.longitude, unit.position.latitude])),
                unit: unit,
            })

            unitMarker.setStyle(
                new Style({
                    image: new Icon({
                        src: '/UnitMarkers/' + unit.imgIcon,
                        scale: 0.05,
                        anchor: [0.5, 0.5],
                    }),
                })
            );
            unitMarkersVectorSource.addFeature(unitMarker as Feature);
        });

        const drawInteraction = new Draw({
            source: lineVectorSource,
            type: 'LineString',
            maxPoints: 2,
        });

        // zobrazení změřené vzdálenosti
        drawInteraction.on('drawend', (event: DrawEvent) => {
            const line = event.feature;
            const geometry = line.getGeometry() as LineString;
            const measuredDistance = getLength(geometry) / 1000; // převod na kilometry
            setMeasuredDistance(measuredDistance);
            setIsModalOpen(true);

            lineVectorSource.clear(); // smazání staré měřící čáry
        });

        // Event listener pro kliknutí na jednotku
        mapInstance.on('click', function (evt) {
            mapInstance.forEachFeatureAtPixel(evt.pixel, function (selectedUnit) {
                handleUnitClick(selectedUnit.getProperties().unit as MilitaryUnit);
                return true
            });
        });

        setMap(mapInstance);
        setDrawMeasuredLine(drawInteraction);

        return () => {
            mapInstance.setTarget(undefined);
        };
    },[setMeasuredDistance, setIsModalOpen]);

    return { mapRef, map, drawMeasuredLine, currentlySelectedUnit, setCurrentlySelectedUnit };
};

export default useMap;