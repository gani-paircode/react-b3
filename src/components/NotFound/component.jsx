import React from 'react'

export const NotFound = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '1rem' }}>Oops!! Sorry, the page you are looking does not exists</h2>
            <iframe
                src="https://giphy.com/embed/UoeaPqYrimha6rdTFV"
                width="80%"
                height="50%"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
            >
            </iframe>
        </div>
    )
}