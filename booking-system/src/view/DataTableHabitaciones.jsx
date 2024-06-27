import { useState, useEffect, useCallback } from 'react';
import Modal from './modals/ModalHabitaciones';

function DataTableCategorias() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);



  {/*Listar habitaciones*/}
  const fetchItems = useCallback(async () => {
    try {
      // Usando Thingproxy para evitar el problema de CORS
      const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
      const targetUrl = 'https://server-hotel-pi.vercel.app/rooms';
      const response = await fetch(proxyUrl + targetUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage, fetchItems]);

  {/*Crear nueva habitacion*/}
  const addOrder = async (newOrder) => {
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    const targetUrl = 'https://server-hotel-pi.vercel.app/rooms/create';
    const response = await fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    });
  
    if (response.ok) {
      fetchItems(currentPage)
      console.log('Habitacion añadida correctamente:', newOrder)
    }
  };

  {/*Eliminar ordenes*/}
  const deleteOrder = async (id) => {
    const response = await fetch(`https://backend-restaurante.deyvids.dev/api/v1/Category/Delete/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      fetchItems(currentPage)
    }
  }



  const handleClickOpenModal = () => {
    setIsModalOpen(true)
  }



  return (
    <div className=' py-6 px-7 w-full flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gris-oscuro dark:text-gray-200'>
      <div >
        <button className='bg-gray-300 text-gray-500 font-semibold px-3 py-2' onClick={handleClickOpenModal} >Añadir Categoria</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddOrder={addOrder} />
      </div>
      <table className='table-auto border border-gray-200 dark:border-gray-500 w-full'>
        <thead>
          <tr>
            <th className="pl-3 py-4 text-left pr-4">ID</th>
            <th className="pl-3 py-4 text-left pr-4">Codigo</th>
            <th className="pl-3 py-4 text-left pr-4">Nombre</th>
            <th className="pl-3 py-4 text-left pr-4"> Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='border border-gray-200 dark:border-gray-500'>
              {Object.entries(row).map(([, value], cellIndex) => {
                const keyBase = `${rowIndex}-${cellIndex}`;
                return <td key={keyBase} className="py-4 pl-3 pr-4 dark:text-gray-200">{value}</td>;
              })}
              <td className='w-64 '>
                <div className='flex justify-between'>
                  <button onClick={() => deleteOrder(row.id)} className='bg-gray-300 text-gray-500 font-semibold px-3 py-2'>Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableCategorias;