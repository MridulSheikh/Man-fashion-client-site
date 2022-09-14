import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {useState} from "react"
import useAuth from '../hooks/useAuth';

function ChekoutForms() {
    const stripe = useStripe();
    const elements = useElements();
    const { singUpwithpass, error, isLoading } = useAuth()

    const [cardError, setCardError] = useState<string>('');


    let total = 0+15;

    let item = JSON.parse(localStorage.getItem('cart') || '{}')
    item.map((itm: any) => {
        total = total + itm.price
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

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


    }

    return (
        <form onSubmit={handleSubmit}>
             <div className="my-5">
                <span className="font-sans mb-1">Pay</span><br />
                <input value={"$"+total} className="font-sans border py-1 px-3 w-full outline-none" readOnly />
            </div>
            <div className="my-5">
                <span className="font-sans">Phone Number*</span><br />
                <input className="font-sans border py-1 px-3 w-full" required />
            </div>
            <div className="mb-5">
                <span className="font-sans">Address*</span><br />
                <input className="font-sans border py-1 px-3 w-full" required />
            </div>
            <div className="mb-7">
                <span className="font-sans">ZIP Code*</span><br />
                <input className="font-sans border py-1 px-3 w-full" required />
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
            <input type="submit" className='font-sans btn btn-sm w-full mt-5' disabled={!stripe}/>
        </form>
    )
}

export default ChekoutForms