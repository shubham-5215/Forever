import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios  from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);


  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const onSubmmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const responce = await axios.post(backendUrl+'/api/user/register', {name, email, password});
        if(responce.data.success){
          setToken(responce.data.token)
          localStorage.setItem('token',responce.data.token)
        }else{
          toast.error(responce.data.message)
        }

      }
      else{
        const responce = await axios.post(backendUrl+'/api/user/login', { email, password});
        if(responce.data.success){
          setToken(responce.data.token)
          localStorage.setItem('token',responce.data.token)
        }else{
          toast.error(responce.data.message)
        }

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text 3x1"> {currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
      </div>

      <div className="w-full px-3 py-2 flex flex-col gap-4">
        {currentState === 'Sign Up' ? (
          <input  onChange={(e)=>setName(e.target.value)} value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        ) : null}

        <input  onChange={(e)=>setEmail(e.target.value)} value={email}
          type="email"
          className="w-Full px-3 py-2 border border-gray-880"
          placeholder="Email"
          required
        />
        <input  onChange={(e)=>setPassword(e.target.value)} value={password}
          type="password"
          className="w-Full px-3 py-2 border border-gray-880"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className=" cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 ">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
