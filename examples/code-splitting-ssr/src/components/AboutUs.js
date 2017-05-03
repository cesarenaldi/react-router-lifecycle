import React from 'react'

export default function AboutUs(props) {
  return (
    <div>
      <h1>About Us</h1>
      <pre>
        { JSON.stringify(props, null, 2) }
      </pre>
    </div>
  )
}
