import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Company } from "@prisma/client";
import styles from "./Map.module.css";
import Link from "next/link";

type MapProps = {
  companies: Company[];
};

const Map: React.FC<MapProps> = ({ companies, ...props }) => {
  // const position = [companies[0].latitude, companies[0].longitude]
  // console.log("companies", companies[0].latitude, companies[0].longitude)
  return (
    <MapContainer
      style={{
        height: "100vh",
      }}
      center={[52.136, 5.2913]}
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {companies?.map((company) => {
        if (company.latitude === null || company.longitude === null) {
          return null;
        }
        return (
          <Marker
            key={company.id}
            position={[company.latitude, company.longitude]}
          >
            <Popup>
              <Link target="_blank" href={`companies/${company.id}`} className={styles.companyName}>
              {company.name}
              </Link>
              <div className={styles.companyLocation}>
                <img className={styles.iconLocation} src="./map-pin.svg" />
                {company.city}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
