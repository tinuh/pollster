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
    },[props.marker.author]);

    function handleClick(){
        props.set1(props.marker)
        props.set2(true)
    }

    return (
        <div className = "image-cropper">
            <img style={{"borderRadius":"50%", "border":"2.5px solid lightblue"}} src={image} width={35} height={35} alt='' onClick={handleClick} />
        </div>
    )
}