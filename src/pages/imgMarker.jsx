import React from 'react';
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

    function handleClick(){
        props.set1(props.marker)
        props.set2(true)
    }

    return (
        <img src={image} width={20} height={20} border="1px solid black" alt='' onClick={handleClick} />
    )
}