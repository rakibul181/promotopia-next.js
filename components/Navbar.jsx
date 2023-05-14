'use client'
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const isUserLoggedIn = true

    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setProviders()
    }, [])
    return (
        <nav className=' flex-between w-full mb-16 pt-3'>
            <Link href={'/'} className='flex gap-2 flex-center'>
                <Image src='assets/images/logo.svg'
                    alt='Promptopia logo'
                    width={30}
                    height={30}
                    className='object-contain' />
                <p className='logo_text'>Promotopia</p>
            </Link>
            {/* desktop navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={'/create-prompt'}
                            className='black_btn'>
                            Create Post
                        </Link>

                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src='/assets/images/logo.svg'
                                width={38}
                                height={38}
                                className='rounded-full'
                                alt='profile '
                            />
                        </Link>

                    </div>
                )
                    :
                    (<>
                        {
                            providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'>
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                    )
                }
                {/* desktop navigation */}

            </div>

            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <Image
                            src='/assets/images/logo.svg'
                            width={38}
                            height={38}
                            className='rounded-full'
                            alt='profile '
                            onClick={() => setToggleDropdown((prev)=>!prev)}
                        />
                        {
                           toggleDropdown && (
                            <div className='dropdown'
                             >
                               <Link
                               href={'/profile'}
                               className='dropdowm_link'
                               onClick={()=> setToggleDropdown(false)}>
                                My Profile
                               </Link> 
                               <Link
                               href={'/creayte-prompt'}
                               className='dropdowm_link'
                               onClick={()=> setToggleDropdown(false)}>
                                Create Prompt
                               </Link> 
                               <button type='button' onClick={()=>{
                                setToggleDropdown(false)
                                signOut()
                               }}
                               className='mt-5 w-full black_btn '>
                                Sign Out
                               </button>
                            </div>
                           )
                        }
                    </div>
                )
                    :
                    <>
                        {
                            providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'>
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                }
            </div>

        </nav>
    );
};

export default Navbar;