import {useState} from 'react'

export default function Store() {
    const [store, setStore] = useState([]);
    const [product, setProduct] = useState('');
    
    function handleChange() {

    const newStore = [
      ...store,
      {id: store.length, name: product }
    ]
    setStore(newStore);
    setProduct('');
    }

    return (
    <>
      <h1>Products list:</h1>
      <input
        value={product}
        onChange={e => setProduct(e.target.value)}
      />
      <button onClick={handleChange}>
        Insert
      </button>
      <ul>
        {store.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );

}