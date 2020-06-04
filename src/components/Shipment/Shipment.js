import React from 'react';
import { useForm } from 'react-hook-form';
import './shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    const auth = useAuth();

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input type="text" defaultValue={auth.user.name} name="name" ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span>Name is required</span>}

            <input type="email" name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span>Email is required</span>}

            <input type="text" name="address1" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address1 && <span>Address is required</span>}

            <input type="text" name="address2" ref={register} placeholder="Address (Optional)" />

            <input type="text" name="city" ref={register({ required: true })} placeholder="Your City" />
            {errors.city && <span>City is required</span>}

            <input type="text" name="zipCode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipCode && <span>Zip Code is required</span>}

            <input type="number" name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span>Phone is required</span>}

            <input type="submit" className="submit" />
        </form>
    );
};

export default Shipment; 