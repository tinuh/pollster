import React from 'react';
import { getUserFromRef } from '../lib/db.js';

export default function ProfileMarker(props){

    const [image, setImage] = React.useState('');

    React.useEffect(()=> {
        setImage(async()=>await getUserFromRef(props.marker.author).logo)
    },[])

    console.log(image)

    return (
        <img src={image} width={20} height={20} alt='' />
    )
}