import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import { toast } from 'react-toastify';
// import uploadImage from '../helpers/uploadImage';

const UploadProduct = ({
    onClose,
    fetchData,
}) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [], // Initialize productImage as an array
        description: "",
        price: "",
        sellingPrice:" ",
        quantity: "",
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
            // [name]: name === 'sellingPrice' ? value.trim() : value,
        }));
        console.log(data);
    }

    const handleUploadProduct = (e) => {
        const files = e.target.files;
        const uploadedImages = [
          
        ];

        for (let i = 0; i < files.length; i++) {
            const uploadedFile = files[i];
            uploadedImages.push(URL.createObjectURL(uploadedFile));
        }

        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, ...uploadedImages], 
        }));
    }

    const handleDeleteProductImage = async(index) => {
        console.log("image Index:",index);

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: [...newProductImage], 
        }));
    }

    {/**upload Product */}
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const response = await fetch(summaryApi.uploadProduct.url,{
            method: summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json();

        if(responseData.success){
            toast.success(responseData?.message)
            onClose();
            fetchData();
        }

        if(responseData.error){
            toast.error(responseData?.message)
        }


        console.log(responseData);

    }

  

    return (
        <div className='fixed  w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
                        <CgClose />
                    </div>
                   
                </div>
                <form   className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        name='productName'
                        id='productName'
                        placeholder='enter product name'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border-rounded'
                        required
                    />
                    <label htmlFor='brandName'className='mt-3'>Brand Name:</label>
                        <input 
                        type='text' 
                        name='brandName'
                        id='brandName' 
                        placeholder='enter brand name'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border-rounded'
                        required
                        />
                    <label htmlFor='category'className='mt-3'> Category:</label>
                    <select required  value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border-rounded'>
                            <option value={""}>Select category</option>
                        {
                            productCategory.map((el,index)=>{
                                return(
                                    <option value={el.value}  key={el.value+index} >{el.label}</option>
                                )
                            })
                        } 
                    </select>
                    <label htmlFor='productImage' className='mt-3'>Product Image:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                        data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2'>
                             {data.productImage.map((el, index) => {

                            return(

                                <div className='relative group '>
                                    <img
                                    key={index}
                                    src={el}
                                    alt={el}
                                     width={80}
                                    height={80}
                                    className='bg-slate-100 border cursor-pointer'
                                     onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(el);
                                            
                                          }}
                                        />
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer'onClick={()=>handleDeleteProductImage(index)}>
                                        <MdDelete />
 
                                        </div>
                                    </div>   
                                    )
                                })}
                            </div>
                                     ) : (
                                    <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                                )
                        }
                    </div>
                    <label htmlFor='price'className='mt-3'>Price:</label>
                        <input
                        type='number'
                        name='price'
                        id='price'
                        placeholder='enter price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                        />
                    <label htmlFor='sellingPrice'className='mt-3'>Selling Price:</label>
                        <input
                        type='number'
                        name='sellingPrice'
                        id='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                        />
                    <label htmlFor='quantity'className='mt-3'>Quantity:</label>
                        <input
                        type='number'
                        name='quantity'
                        id='quantity'
                        placeholder='enter quantity'
                        value={data.quantity}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                        />

                    <label htmlFor='description'className='mt-3'>Description:</label>
                        <textarea
                            name='description'
                            value={data.description}
                            onChange={handleOnChange}
                            className='h-28 bg-slate-100 border resize-none p-1'
                            placeholder='enter product description'
                            rows={3}
                        
                        />

                <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
            
            </form>
            </div>
            {/**Display Image Full Screen */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProduct;
