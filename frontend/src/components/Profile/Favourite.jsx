import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCards from '../BookCards';

const Favourite = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const tokenlocal = JSON.parse(localStorage.getItem("Token"));
        const idlocal = JSON.parse(localStorage.getItem("Users"));
        const headers = {
            'authorization': `Bearer ${tokenlocal}`,
            'id': idlocal,
        };
        const roles = async () => {
            try {
                const res = await axios.get("http://localhost:1000/add/get-favourite", { headers });
                setData(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        roles();
    }, [Data]);

    return (
        <>
            {
                Data.length === 0 &&
                <div className='flex justify-center items-center h-screen text-4xl text-yellow-200 '>
                    <p>Not Favourite Book</p>
                    <svg class="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor">
                        <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                        <path fill-rule="evenodd" d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd" />
                        <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
                    </svg>

                </div>
            }

            <div className='grid grid-cols-4 gap-4'>
                {
                    Data && Data.map((items, i) => (
                        <div key={i}>
                            <BookCards data={items} favourite={true} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Favourite;
