
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { icon } from 'leaflet'
// import L from "leaflet"  
import { postMapData } from '../lib/api'




const MapOverview = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    const data = postMapData().then(data => {
      
      setRows(data.rows)
    })
  }, [])
  console.log(rows)
  
  return (
    <MapContainer center={[6.524400, 3.379199]} zoom={3} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        rows.map((row) => (
          <Marker key={row.longitude_deg+row.latitude_deg} position={[row.latitude_deg , row.longitude_deg]} style={"width:48, height:48 "}>
            <Popup className='bg-white'>
              Kanda.<br /> {row.latitude_deg} {row.longitude_deg}.
            </Popup>
          </Marker>
        ))
      }
      
    </MapContainer>
  )
}

export default MapOverview