import { useState } from 'react'
import MovingDot from './components/MovingDot';

function ProductCategoryRow({ category}){
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
  <span style={{color: 'red'}}>
    {product.name}
  </span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if(
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if(product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      )
    }
    rows.push(
      <ProductRow
        product={product}
        key = {product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..."
      onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <div>
      < SearchBar
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly} />
      < ProductTable 
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      products={products} />
    </div>
  )
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];



let nextId = 0;

function List({products, setProducts}) {
  const [name, setName] = useState('');


  return (
    <>
      <h1>Add Products:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setProducts([
          ...products,
          { id: nextId++, name: name , category: category, stocked: stocked, price: price}
        ]);
        setName('');
      }}>Add</button>
      <ul>
        {products.map(artist => (
          <li key={products.id}>{products.name}</li>
        ))}
      </ul>
    </>
  );
}


export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <>
    {/* <MovingDot /> */}
    <List products={products} setProducts={setProducts}/>
  <FilterableProductTable products={PRODUCTS} />
  </>
  )
}

