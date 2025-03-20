import { authModelState } from '@/atoms/authModelAtom';
import React, { useEffect, useState } from 'react'
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup({ theme, closeTab, setCloseTab }) {
    const [show, setShow] = useState(false);

    const setRecoilState = useSetRecoilState(authModelState)
    const authHandler = (authType) => {
        setRecoilState((prev) => ({ ...prev, type: authType }))
    }

    const [formData, setFormData] = useState({
        email: '', name: '', password: ''
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);

    async function sumbitHandler(event) {
        event.preventDefault();

        if (!formData.email || !formData.name || !formData.password) {
            toast("Please fill all fields", {
                icon: "🙄"
            })
            return;
        }

        if (formData.password.length < 6) {
            toast('Password too small.',
                {
                    icon: '🗝️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(formData.email, formData.password);
            let newuserData;

            if (!newUser)
                return;

            newuserData = {
                u_id: newUser.user.uid,
                email: newUser.user.email,
                displayName: formData.name,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedSolution: [],
                bookmarked: []
            }

            const userRef = doc(firestore, "users", newUser.user.uid);
            await setDoc(userRef, newuserData);
            toast.success("Account Created Successfully 🎉.");
            authHandler('login');
            setCloseTab(false);

        }
        catch (error) {
            toast.error("Looks like an error occured.");
        }

    }

    // useEffect(() => {
    //     if (error) {
    //         toast.error(error);
    //     }
    // }, [error])


    return (
        <div className="flex flex-col w-full">
            <div className='mb-2'>
                <h1 className='text-2xl font-bold'>Register</h1>
                <p className='text-sm'>Create your account</p>
            </div>
            <form className='my-2 rounded-lg p-4 bg-[#fff] w-9/10 text-light_text_primary' onSubmit={sumbitHandler}>
                <div className="flex flex-col">
                    <label htmlFor='email' className='mb-1'>Email address :</label>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={changeHandler}
                        className='bg-[#f5f5fa] rounded p-2 focus:outline-none  w-full'
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor='name' className='mb-1'>Your Name :</label>
                    <input
                        type='name'
                        placeholder='Name'
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={changeHandler}
                        className='bg-[#f5f5fa] rounded p-2 focus:outline-none  w-full'
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor='password' className='mb-1'>Password :</label>
                    <div className='relative'>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='Password'
                            name='password'
                            id='password'
                            value={formData.password}
                            onChange={changeHandler}
                            className='bg-[#f5f5fa] rounded p-2 focus:outline-none w-full'
                        />
                        <p className='absolute top-0 right-0 translate-x-[-50%] translate-y-2/4 cursor-pointer'>
                            {
                                show ? (<FiEye onClick={() => setShow(!show)} />) : (<FiEyeOff onClick={() => setShow(!show)} />)
                            }
                        </p>
                    </div>
                </div>

                <button className='mt-2 bg-blue-500 w-full text-center text-white py-2 rounded cursor-pointer'>
                    {loading ? <>Creating Account..</> : <>Create Account</>}
                </button>
            </form>
            <p className='text-base'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => authHandler('login')}> Sign in.</span></p>
        </div>

    )
}