import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Shipment } from '../../types/shipment';
import { createShipment, updateShipment } from '../../services/shipmentService';

interface ShipmentFormProps {
  existingShipment?: Shipment;
  onSubmitSuccess: () => void;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ existingShipment, onSubmitSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Shipment>({
    defaultValues: existingShipment || {
      origin: '',
      destination: '',
      weight: 0,
      status: 'pending',
    },
  });

  const onSubmit = async (data: Shipment) => {
    try {
      if (existingShipment) {
        await updateShipment(existingShipment.id, data);
      } else {
        await createShipment(data);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting shipment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Origin</label>
        <input {...register('origin', { required: true })} />
        {errors.origin && <span>This field is required</span>}
      </div>
      <div>
        <label>Destination</label>
        <input {...register('destination', { required: true })} />
        {errors.destination && <span>This field is required</span>}
      </div>
      <div>
        <label>Weight</label>
        <input type="number" {...register('weight', { required: true, min: 0 })} />
        {errors.weight && <span>This field is required and must be a positive number</span>}
      </div>
      <div>
        <label>Status</label>
        <select {...register('status')}>
          <option value="pending">Pending</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <button type="submit">{existingShipment ? 'Update Shipment' : 'Create Shipment'}</button>
    </form>
  );
};

export default ShipmentForm;