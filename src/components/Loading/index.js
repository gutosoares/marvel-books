import React from 'react'
import ReactLoading from 'react-loading'

import './styles.css'

function Loading() {
  return (
    <div id="loading">
      <ReactLoading className="loading" type="spin" color="#000" />
    </div>
  )
}

export default Loading


