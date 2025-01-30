import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    Zipcode: '',
    country: '',
    phone: '',
  });
 
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (paymentMethod) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case 'stripe': {
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } });
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        default:
          toast.error('Invalid payment method selected');
          break;
      }
    } catch (error) {
      console.error("Order Placement Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name='Zipcode' value={formData.Zipcode} type="text" placeholder="Zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder="Phone " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>
      
      {/* Right Side */}
      <div className="mt-8">
        <CartTotal />
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex flex-col lg:flex-row gap-4">
            {['stripe', 'razorpay', 'cod'].map((method) => (
              <div key={method} onClick={() => setPaymentMethod(method)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === method ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">{method.toUpperCase()}</p>
              </div>
            ))}
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit' className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
