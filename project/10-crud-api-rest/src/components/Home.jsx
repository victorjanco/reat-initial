import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { showAlert, OPERATION } from '../functions'

function Home() {
    // const url_products='products/all'
    // const url_all = `${URL_API}${url_products}`
    const [products,setProducts] = useState([])
    const [categorys,setCategorys] = useState([])
    const [productId,setProductId] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [stock,setStock] = useState(0)
    const [categoryId,setCategoryId] = useState(0)
    const [operation,setOperation] = useState(OPERATION.SAVE)
    const [title,setTitle] = useState('teyer')

    useEffect(() => {
        getProducts()
        getCategorys()
    },[])
    
    const getProducts = async () => {
        // // const result =  await fetch(url_all)
        // // const result =  await fetch("http://localhost:8090/platzi-market/api/products/all")
        // const result =  await axios.get("http://localhost:8090/platzi-market/api/products/all")
        // // const productos = await result.json
        // setProducts(result.data)
        // // console.log(url_all)

        try {
            const response = await fetch('http://localhost:8090/platzi-market/api/products/all'); // Replace with your API endpoint
            const jsonData = await response.json();
            setProducts(jsonData);
            console.log(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    const getCategorys = async () => {
        try {
            const response = await fetch('http://localhost:8090/platzi-market/api/categorys/all'); // Replace with your API endpoint
            const jsonData = await response.json();
            setCategorys(jsonData);
            console.log(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    const openForm = (op,id,name,price,stock,categoryId) => {
        getCategorys()
        setProductId('')
        setName('')
        setPrice('')
        setStock('')
        setCategoryId(0)
        setOperation(op)
        setTitle('Registrar Producto')
        if(op===2){
            setTitle('Editar Producto')
            setProductId(id)
            setName(name)
            setPrice(price)
            setCategoryId(categoryId)
            setStock(stock)
        }
    }
    const handleChange = (event) => {
        setCategoryId(event.target.value);
    }
    const validar = () => {
        let parameter = {
            name:name.trim(),
            stock:stock,
            price:price,
            categoryId:categoryId
        }
        let method ='POST'
        let url ='http://localhost:8090/platzi-market/api/products/save'

        if(name.trim()==='') {
            showAlert('Escribe el nombre del producto', 'warning')
        }

        if(operation===OPERATION.UPDATED){
            parameter = {
                productId:productId,
                name:name.trim(),
                stock:stock,
                price:price,
                categoryId:categoryId
            }
            method='PUT'
        }

        sendRequest(method,parameter, url)
    }
    const sendRequest = async (method, parameter, url)=>{
        await axios({method:method, url:url, data:parameter}).then(function(response){
            let type = response.data[0]
            let message = response.data[1]
            showAlert(message,type)
            openForm(OPERATION.SAVE)
            getProducts()
        }).catch(function(error){
            showAlert('Error en la solicitud','error')
            console.log(error)
        })
    }
  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button onClick={() => openForm(OPERATION.SAVE)}  type='button' className='btn btn-dark' data-bs-toogle='modal' data-bs-target='#modalProducts'>
                            <i className='fa-solid fa-circle-plus'></i> Add
                        </button>
                    </div>
                </div>
                <div className='col-md-4 offset-md-4'>
                    <div className='form-content'>
                        <div className='form-header'>
                            <h1 className='form-title fs-5' id="modalProductsLabel">{title}</h1>
                        </div>
                        <div className='form-body'>
                            <input type="hidden" id='id' value={productId}></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type="text" id='nombre' className='form-control' placeholder='Nombre' value={name} 
                                    onChange={(e)=>setName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type="number" id='precio' className='form-control' placeholder='Precio' value={price} 
                                    onChange={(e)=>setPrice(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type="number" id='stock' className='form-control' placeholder='Stock' value={stock} 
                                    onChange={(e)=>setStock(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <select id={categoryId} onChange={handleChange} name="category" defaultValue={0} className="form-select" aria-label="Default select example">
                                    {
                                        categorys.map(item => (
                                            <option key={item.categoryId} value={item.categoryId} selected={categoryId == item.categoryId}>{item.category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={()=>validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Save
                                </button>
                            </div>
                        </div>
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
                            <tbody>
                                {
                                    products.map((item,i) => (
                                        <tr key={item.productId}>
                                            <td>{(i+1)}</td>
                                            <td>{item.name}</td>
                                            <td>${ new Intl.NumberFormat('es-mx').format(item.price)}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <button onClick={() => openForm(OPERATION.UPDATE,item.productId,item.name,item.price,item.stock, item.categoryId)} type='button' className='btn btn-warning'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalProducts' className='modal' tabIndex='-1' aria-labelledby='modalProductsLabel' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id="modalProductsLabel">{title}</h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type="hidden" id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            {/* <input type="text" id='nombre' className='form-control' placeholder='Nombre' value={name} 
                                onChange={(e)=>setName(e.target.value)}></input> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Home