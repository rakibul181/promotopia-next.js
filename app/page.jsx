import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>Discover & share
                <br className='max-md:hover:' />
                <span className='green_gradient'>
                    AI-Powered Prompts
                </span>
            </h1>
            <p className='desc'>
                Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
            </p>
            <Feed />
        </section>
    );
};

export default Home;