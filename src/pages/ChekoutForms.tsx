import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {useEffect, useState} from "react"
import useAuth from '../hooks/useAuth';

function ChekoutForms() {
    const stripe = useStripe();
    const elements = useElements();
    const { singUpwithpass, error, isLoading, loacluser } = useAuth();
    const [number,setNumber] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [zip, setZip] = useState<string>();
    const [ClientSecreet, setClientSecreet] = useState<string>();
    const [stloading, setstLoading] = useState<boolean>(false);

    const [cardError, setCardError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [transitionId, setTransitionId] = useState<string>('');


    let total = 0+15;

    let item = JSON.parse(localStorage.getItem('cart') || '{}')
    item.map((itm: any) => {
        total = total + itm.price
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setstLoading(true)
        e.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            setCardError(error.message!)
        }
        else{
            setCardError("")
        }

        //confirm card payment
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            ClientSecreet!,
            {
                payment_method:{
                    card :card, 
                    billing_details:{
                        name: loacluser.displayName,
                        email: loacluser.email,
                    },
                },
            },
        );

        if(intentError){
            setCardError(intentError?.message!)
            setstLoading(false)
        }
        else{
            setCardError(' ')
            setSuccess('your payment is complited')
            setTransitionId(paymentIntent.id)
            axios.post("http://localhost:5000/api/v1/order",{
                email: loacluser.displayName,
                user_id: loacluser._id,
                total_amount: total,
                mobile : number,
                address: address,
                zip : zip,
                product: item,
            })
            .then(function (response) {
                localStorage.setItem("cart",JSON.stringify([]))
              })
              .catch(function (error) {
                // console.log(error);
              })
              .finally(()=>setstLoading(false))
        }
    }

    useEffect(()=>{
        fetch("http://localhost:5000/api/v1/create-payment-intent",{
            method: 'POST',
            headers:{
                'content-type' : 'application/json',
            },
            body: JSON.stringify({price: total})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.clientSecret){
                setClientSecreet(data.clientSecret);
            }
        })
    },[])

    return (
        <form onSubmit={handleSubmit}>
             <div className="my-5">
                <span className="font-sans mb-1">Pay</span><br />
                <input value={"$"+total} className="font-sans border py-1 px-3 w-full outline-none" readOnly />
            </div>
            <div className="my-5">
                <span className="font-sans">Phone Number*</span><br />
                <input onChange={(e)=>setNumber(e.target.value)} className="font-sans border py-1 px-3 w-full" required />
            </div>
            <div className="mb-5">
                <span className="font-sans">Address*</span><br />
                <input onChange={(e)=>setAddress(e.target.value)} className="font-sans border py-1 px-3 w-full" required />
            </div>
            <div className="mb-7">
                <span className="font-sans">ZIP Code*</span><br />
                <input onChange={(e)=>setZip(e.target.value)} className="font-sans border py-1 px-3 w-full" required />
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {
                cardError && <p className='py-5 text-red-700 font-sans'>{cardError}</p>
            }
            {
                success && <p className='py-5 text-green-700 font-sans'>{success} yout transition id : <span className='font-bold font-sans text-yellow-500'>{transitionId}</span></p>
            }
            {
                stloading &&  <p className='py-5 text-yellow-700 font-sans'>please wait...</p>
            }
            <input type="submit" className='font-sans btn btn-sm w-full mt-5' disabled={!stripe || !ClientSecreet}/>
        </form>
    )
}

export default ChekoutForms