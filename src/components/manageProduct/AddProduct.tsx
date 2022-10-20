import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import { MdCloudUpload } from 'react-icons/md';

function AddProduct() {
    const [size, setSize] = useState<string>();
    const [prs, setPrs] = useState<string[]>([]);
    const [varient, setVarient] = useState<string>("select product varient");
    const [aboutString, setAboutString] = useState<string>();
    const [about, setAbout] = useState<string[]>([]);
    const [productimgs, setProductimgs] = useState<Blob>();

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
                            <input type="text" placeholder="Product Name" className="input input-bordered input-md w-full" />
                            <input type="number" placeholder="Product Price" className="input input-bordered input-md w-full" />
                            <div className='flex gap-2'>
                                {
                                    prs.map(ps => <div className='badge'>{ps}<button onClick={() => removedSize(ps)} className='text-sm font-light ml-3'><GiCancel /></button></div>)
                                }
                            </div>
                            <div className='flex gap-3'>
                                <input onBlur={(e) => setSize(e.target.value)} type="text" placeholder="Product Size" className="input input-bordered input-md w-full" />
                                <button onClick={addSize} className='btn btn-md'>Add</button>
                            </div>
                            <select className="select w-full max-w-xs">
                                <option disabled selected>{varient}</option>
                                <option onClick={() => setVarient("shoes")}>Shoes</option>
                                <option onClick={() => setVarient("t-shirt")}>T-Shirt</option>
                                <option onClick={() => setVarient("shirt")}>Shirt</option>
                                <option onClick={() => setVarient("gines")}>Gines</option>
                                <option onClick={() => setVarient("watches")}>Watches</option>
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
                            <button className='btn btn-sm'>saved</button>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    )
}

export default AddProduct