import React from 'react'
import './NewCollections.css'
import New_collections from "../Assets/New_collections"
import Item from '../Item/Item'
const NewCollections = () => {
  const [new_collections, setNew_collection] = React.useState([])
  React.useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then(response => response.json())
      .then(data => { setNew_collection(data); console.log(data) })

  }, [])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections" style={{ maxHeight: "50vh", overflow: "auto", overflowX: "hidden" }}>
        {new_collections.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>

    </div>
  )
}

export default NewCollections
