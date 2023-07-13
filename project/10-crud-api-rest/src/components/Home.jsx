import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { showAlert, URL_API } from '../functions'

function Home() {
    // const url_products='products/all'
    // const url_all = `${URL_API}${url_products}`
    const[products,setProducts] = useState([])
    const [productId,setProductId] = useState('')
    const [name,setName] = useState('')
    const [categoryId,setCategoryId] = useState(1)
    const [price,setPrice] = useState(0)
    const [stock,setStock] = useState(0)
    const [active,setActive] = useState(false)
    const [operation,setOperation] = useState(1)
    const [title,setTitle] = useState('')

    useEffect(() => {
        getProducts()
    },[])
    
    const getProducts = async () => {
        // const result =  await fetch(url_all)
        // const result =  await fetch("http://localhost:8090/platzi-market/api/products/all")
        const result =  await axios.get("http://localhost:8090/platzi-market/api/products/all")
        // const productos = await result.json
        setProducts(result.data)
        // console.log(url_all)
    }
  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button className='btn btn-dark' data-bs-toogle='modal' data-bs-target='#modalProducts'>
                            <i className='fa-solid fa-circle-plus'></i>Add
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>PRODUCTO</th>
                                    <th>PRECIO</th>
                                    <th>STOCK</th>
                                    <th>OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    products.map((product,i)=>{
                                        <tr key={product.productId}>
                                            <td>{(i+1)}</td>
                                            <td>{product.name}</td>
                                            <td>${ new Intl.NumberFormat('es-mx').format(product.price)}</td>
                                            <td>{product.stock}</td>
                                            <td>gggg</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className='modal fade'>
            
        </div>
    </div>
  )
}
export default Home