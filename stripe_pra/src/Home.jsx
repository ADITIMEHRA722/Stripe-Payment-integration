



import { useState } from 'react';

const Home = () => {
    const itemName = "FIREING";
    const itemPrice = 500;
    const [quantity, setQuantity] = useState(1);
    const [finalAmount, setFinalAmount] = useState(itemPrice);

    const decrement = () => {
        if (quantity <= 1) {
            setQuantity(1);
            setFinalAmount(itemPrice);
        } else {
            setQuantity(quantity - 1);
            setFinalAmount(finalAmount - itemPrice);
        }
    };

    const increment = () => {
        setQuantity(quantity + 1);
        setFinalAmount(finalAmount + itemPrice);
    };

    const ckechout = async () => {
        try {
            const res = await fetch("http://localhost:8000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quantity,
                            price: itemPrice,
                            name: itemName
                        },
                    ]
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Response from server:', data);

            if (data.url) {
                window.location = data.url;
            } else {
                throw new Error('URL is undefined in the response');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex justify-evenly flex-row">
                <div className="m-10 bg-500-blue h-[200px] w-[400px]">
                    <div>
                        <img className="h-250px" src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="" />
                    </div>
                </div>

                <div className="mt-10 p-20 rounded shadow-md">
                    <h1 className="text-yellow-600 font-bold mb-4">FIREING</h1>
                    <h3 className="mb-4">price: <span>₹ {itemPrice}</span></h3>
                    <h4 className="mb-4">Add Quantity</h4>
                   <div className = "flex justify-center">
                   <button onClick={decrement} className="mr-[10px] h-[60px] w-[60px] bg-purple-500 text-lg font-medium rounded">-</button>
                    <div className="m-4 pr-4">{quantity}</div>
                    <button onClick={increment} className="h-[60px] w-[60px] bg-purple-500 text-lg font-medium rounded">+</button>
                   </div>
                    <h2 className="mt-10">Amount to be paid: <span>₹ {finalAmount}</span></h2>
                    <button className="mt-10 h-[40px] w-[100px] bg-yellow-500 hover:bg-yellow-700 rounded" onClick={ckechout}>Checkout</button>
                </div>
            </div>
        </>
    );
};

export default Home;

