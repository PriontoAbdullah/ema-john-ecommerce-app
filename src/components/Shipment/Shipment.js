import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useAuth } from '../Login/useAuth';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './shipment.css';

const Shipment = () => {
	const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const [shippingData, setShippingData] = useState(null);

	const onSubmit = (data) => {
        setShippingData(data)
    };

	const handlePaymentSuccess = (paymentID) => {
		const savedCart = getDatabaseCart();
		console.log(savedCart);
		const orderDetails = {
			email: auth.user.email,
			paymentID,
			products: savedCart,
			shipment: shippingData,
			orderTime: new Date()
		};

		fetch('http://localhost:5000/addOrder', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderDetails)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					processOrder();
					alert('Your Order placed successfully');
				}
			});
	};

	return (
		<div className="row">
			<div className="col-md-6" style={{display: shippingData ? 'none' : 'block'}}>
				<form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						defaultValue={auth.user.name}
						name="name"
						ref={register({ required: true })}
						placeholder="Your Name"
					/>
					{errors.name && <span>Name is required</span>}

					<input
						type="email"
						name="email"
						defaultValue={auth.user.email}
						ref={register({ required: true })}
						placeholder="Your Email"
					/>
					{errors.email && <span>Email is required</span>}

					<input type="text" name="address1" ref={register({ required: true })} placeholder="Your Address" />
					{errors.address1 && <span>Address is required</span>}

					<input type="text" name="address2" ref={register} placeholder="Address (Optional)" />

					<input type="text" name="city" ref={register({ required: true })} placeholder="Your City" />
					{errors.city && <span>City is required</span>}

					<input type="text" name="zipCode" ref={register({ required: true })} placeholder="Zip Code" />
					{errors.zipCode && <span>Zip Code is required</span>}

					<input
						type="number"
						name="phone"
						ref={register({ required: true })}
						placeholder="Your Phone Number"
					/>
					{errors.phone && <span>Phone is required</span>}

					<input type="submit" className="submit" />
				</form>
			</div>

			<div className="col-md-3 mt-5 mx-5"  style={{display: shippingData ? 'block' : 'none'}}>
				<h5 className="py-3">Pay with stripe</h5>
				<ProcessPayment handlePaymentSuccess={handlePaymentSuccess}/>
			</div>
		</div>
	);
};

export default Shipment;
