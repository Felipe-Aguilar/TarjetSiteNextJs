import React from 'react'

const page = () => {

    fetch('/api/analytics/popular-st-pages')
    .then(response => response.json())
    .then(data => console.log(data));
    
    return (
        <div>page</div>
    )
}

export default page