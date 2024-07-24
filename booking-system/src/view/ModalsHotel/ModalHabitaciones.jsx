import { useState } from 'react'

/* eslint-disable react/prop-types */
export default function Modal({ isOpen, onClose, onAddOrder}) {
  const [form, setForm] = useState({
      id: '',
      roomNumber: '',
      roomType: '',
      price: '',
      service: []
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'price' && value !== '') {
        value = Number(value);
    } else if (name === 'service') {
        const services = [...form.service];
        if (e.target.checked) {
            services.push(value);
        } else {
            const index = services.indexOf(value);
            if (index > -1) {
                services.splice(index, 1);
            }
        }
        value = services;
    }
    setForm({
        ...form,
        [name]: value,
    });
};

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddOrder(form)
    setForm({
      id: '',
      roomNumber: '',
      roomType: '',
      price: '',
      service: ''
    })
  }

  if (!isOpen) {
      return null;
  }

  return (
    <div className="modal flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-700 bg-opacity-50 dark:bg-negro-claro dark:bg-opacity-50">
        <div className="modal-content bg-white rounded shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-center mb-4 text-xl font-semibold dark:text-negro-claro">Añadir habitacion</h2>
            <form onSubmit={handleSubmit} className='dark:text-negro-claro'>
                <input type="number" name="id" value={form.id || ''} onChange={handleChange} placeholder="Id" className="mb-2 p-2 w-full border rounded" />
                <input type="text" name="roomNumber" value={form.roomNumber || ''} onChange={handleChange} placeholder="Numero de habitación" className="mb-2 p-2 w-full border rounded" />
                <select name="roomType" value={form.roomType} onChange={handleChange} className="mb-2 p-2 w-full border rounded dark:text-negro-claro">
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="DOBLE">Doble</option>
                    <option value="MATRIMONIAL">Matrimonial</option>
                </select>
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Precio" className="mb-2 p-2 w-full border rounded" />
                <div className="mb-2">
                    <label>Servicios:</label>
                    <div>
                        <input type="checkbox" name="service" value="WIFI" onChange={handleChange} /> WIFI
                        <input type="checkbox" name="service" value="TV" onChange={handleChange} /> TV
                        {/* Agrega más servicios según sea necesario */}
                    </div>
                </div>
                <button type="submit" className="block w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">Añadir</button>
            </form>
            <button onClick={onClose} className="block w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Cerrar</button>
        </div>
    </div>
  );
}