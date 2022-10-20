import axios from 'axios';
import React, { useEffect, useState } from 'react'
import imageCompression from "browser-image-compression";
import { AiOutlinePlus } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import { MdCloudUpload } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';

function AddProduct() {
    const [size, setSize] = useState<string>();
    const [prs, setPrs] = useState<string[]>([]);
    const [varient, setVarient] = useState<string>();
    const [aboutString, setAboutString] = useState<string>();
    const [about, setAbout] = useState<string[]>([]);
    const [productimgs, setProductimgs] = useState<Blob>();
    const [productName, setProductName] = useState<string>();
    const [productPrice, setProductPrice] = useState<string>();
    const [err, setErr] = useState<any>();
    const [loading, setLoading] = useState(false)

    const productSize: any[] = [];
    const addSize = () => {
        if (size?.length == 0) {
            return
        }
        prs.map(pr => productSize.push(pr))
        productSize.push(size);
        setPrs(productSize)
    }

    const removedSize = (s: string) => {
        const array = prs.filter(rs => rs != s);
        setPrs(array)
    }


    const aboutArray: any[] = [];

    const addAbout = () => {
        if (aboutString?.length == 0) {
            return;
        }
        about.map(ab => aboutArray.push(ab))
        aboutArray.push(aboutString);
        setAbout(aboutArray)

    }

    const removeAbout = (b: string) => {
        const array = about.filter(ab => ab != b)
        setAbout(array)
    }

    const imgHandler = (e: any) => {
        if (e.target.files.length !== 0) {
            setProductimgs(e.target.files[0])
        }
    }

    const HandlePostProduct = async () => {
        setLoading(true)
        setErr("")
        if (productName == "") {
            setErr("Product name required")
            return;
        }
        else if (productPrice == "") {
            setErr("Product price required")
            return;
        }
        else if (!size) {
            setErr("Product size require")
            return;
        }
        else if (!about) {
            setErr("Product about required")
            return;
        }
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 400,
            useWebWorker: true
        }

        try {
            // @ts-ignore
            const compressedFile = await imageCompression(productimgs, options);
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            //save user
            const imgbbkey = "e09f83c95842d0cbd98bf818d814146f";
            const formData = new FormData();
            formData.append('image', compressedFile);
            const uri = `https://api.imgbb.com/1/upload?key=${imgbbkey}`
            fetch(uri, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    const productImg = (result.data.display_url)
                    const deletImgUri = (result.data.delete_url)
                    const url = "http://localhost:5000/api/v1/product"
                    axios.post(url, {
                        productName,
                        productPrice: parseInt(productPrice!),
                        productSize: prs,
                        productDetails: about,
                        productVarient: varient,
                        productImg,
                        deletImgUri
                    })
                        .then(res => {
                            if (res.data.id) {
                                alert(`successfully added product Id : ${res.data.id}`)
                            }
                        })
                        .finally(() => setLoading(false))
                })


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <label htmlFor="my-modal-4" className="btn modal-button btn-sm"><AiOutlinePlus /></label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div>
                        <div className='flex flex-col gap-5 '>
                            <div className='w-full'>
                                <img src={productimgs && URL.createObjectURL(productimgs!)} alt="" className="text-center my-3 rounded-md mx-auto" />
                            </div>
                            <div className='relative w-full flex justify-center'>
                                <input onChange={imgHandler} className="font-sans w-full opacity-0 cursor-pointer" accept='image/*' type="file" required />
                                <label htmlFor='upload-button' className='flex font-sans px-4 rounded-md gorup-hover:bg-black group-hover:cursor-pointer group-hover:text-white border-2 border-black text-black py-1 text-center absolute top-0 -z-10'><MdCloudUpload className='text-2xl mr-2' /> Prouduct Image</label>
                            </div>
                            <input onBlur={(e) => setProductName(e.target.value)} type="text" placeholder="Product Name" className="input input-bordered input-md w-full" />
                            <input onBlur={(e) => setProductPrice(e.target.value)} type="number" placeholder="Product Price" className="input input-bordered input-md w-full" />
                            <div className='flex gap-2'>
                                {
                                    prs.map(ps => <div className='badge'>{ps}<button onClick={() => removedSize(ps)} className='text-sm font-light ml-3'><GiCancel /></button></div>)
                                }
                            </div>
                            <div className='flex gap-3'>
                                <input onBlur={(e) => setSize(e.target.value)} type="text" placeholder="Product Size" className="input input-bordered input-md w-full" />
                                <button onClick={addSize} className='btn btn-md'>Add</button>
                            </div>
                            {
                                varient &&
                                <p>catagory : {varient}</p>
                            }
                            <select value={varient} onChange={(e)=>setVarient(e.target.value)} className="select w-full max-w-xs">
                                <option disabled selected>select Varient</option>
                                <option>Shoes</option>
                                <option>T-Shirt</option>
                                <option>Shirt</option>
                                <option>Gines</option>
                                <option>Watches</option>
                            </select>
                            <ol>
                                {
                                    about.map(ab => <li className='mt-3 block'>{ab}<button onClick={() => removeAbout(ab)} className='text-sm font-light ml-3 text-red-800'><GiCancel /></button></li>)
                                }
                            </ol>
                            <div className='flex gap-3'>
                                <input onBlur={(e) => setAboutString(e.target.value)} type="text" placeholder="Product Info" className="input input-bordered input-md w-full" />
                                <button onClick={addAbout} className='btn btn-md'>Add</button>
                            </div>
                            {
                                err &&
                                <p className='text-red-700'>{err}</p>
                            }
                            {
                                loading &&
                                <div className='flex justify-center'>
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="35"
                                        visible={true}
                                    />
                                </div>
                            }
                            <button onClick={HandlePostProduct} className='btn btn-sm'>saved</button>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    )
}

export default AddProduct