import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChekoutForms from './ChekoutForms';

interface IFormInput {
    number: string;
    address: string;
  }

function Shpping() {

    const stripePromise = loadStripe('pk_test_51Jw08MHj2nDrVn5SrnumCPpzPf1neGnUKuqvppjglKvm0iM5F70fc7tenTS4kFHneaV4EN544VKW3HOf1qsLkGQi00Mhs2bHqZ');

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-3/12 shadow-md p-5'>
            <div className="mt-6">
              <div className="mt-5">
                  <Elements stripe={stripePromise}>
                    <ChekoutForms />
                  </Elements>
              </div>
            </div>
            </div>
        </div>
    )
}

export default Shpping