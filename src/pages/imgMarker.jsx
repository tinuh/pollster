import React from 'react';
import { Overlay } from 'pigeon-maps'
import { getUserFromRef } from '../lib/db.js';

export default function ProfileMarker(props){

    const [image, setImage] = React.useState('');

    React.useEffect(()=> {
        async function getImage() {
            const userDoc = await getUserFromRef(props.marker.author);
            setImage(userDoc.logo);
        }
        getImage();
    },[]);

    return (
        <Overlay anchor={[props.marker.location._lat, props.marker.location._long]} offset={[10, 40]} >
            <img src={image} width={20} height={20} alt='' />
        </Overlay>
    )
}