import React from 'react'

export default function AboutUs({ match }) {
  return (
    <div>
      <h1>About Us</h1>
      <pre>
        { JSON.stringify(match, null, 2) }
      </pre>
    </div>
  )
}
