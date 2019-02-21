import React from 'react'

const Table = ({ update, cells }) => (
  <div className="table">
    {cells.map((item, index) => (
      <div
        key={index}
        className="cells"
        data-index={index}
        onClick={() => update({ index })}
      >
        {item}
      </div>
    ))}
  </div>
)

export default Table