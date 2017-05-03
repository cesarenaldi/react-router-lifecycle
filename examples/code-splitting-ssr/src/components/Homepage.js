import React from 'react'

export default function Homepage({ match }) {
  return (
    <div>
      <h1>Home</h1>
      <pre>
        { JSON.stringify(match, null, 2) }
      </pre>
    </div>
  )
}
