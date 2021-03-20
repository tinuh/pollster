import React from 'react';
import {Pie} from 'react-chartjs-2';

export default function PollResults(){
    return(
        <>
            <Pie
                data={{
                    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                    datasets: [{data:[1,2,3], backgroundColor: ['red', 'blue', 'orange']}]
                }}
            />
        </>
    )
}