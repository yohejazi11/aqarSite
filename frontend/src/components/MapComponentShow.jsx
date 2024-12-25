import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import { Feature } from "ol";

const MapComponentShow = ({ latitude, longitude }) => {
    const mapElement = useRef();
    const markerLayer = useRef();

    useEffect(() => {
        // إعداد مصدر العلامات
        const vectorSource = new VectorSource();

        // إنشاء طبقة العلامات
        markerLayer.current = new VectorLayer({
            source: vectorSource,
        });

        // إنشاء الخريطة
        const map = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                markerLayer.current,
            ],
            view: new View({
                center: fromLonLat([longitude, latitude]), // مركز الخريطة
                zoom: 14,
            }),
        });

        // إضافة العلامة للموقع
        if (latitude && longitude) {
            const marker = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
            });

            marker.setStyle(
                new Style({
                    image: new Icon({
                        src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // أيقونة العلامة
                        scale: 0.05,
                    }),
                })
            );

            vectorSource.addFeature(marker);
        }
    }, [latitude, longitude]);

    return (
        <div
            ref={mapElement}
            style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
        ></div>
    );
};

export default MapComponentShow;
