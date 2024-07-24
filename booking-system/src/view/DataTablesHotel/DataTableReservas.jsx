import { useState, useEffect, useCallback } from 'react';
function DataTableReservas() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);



  {/*Listar habitaciones*/}
  const fetchItems = useCallback(async () => {
    try {
      // Usando Thingproxy para evitar el problema de CORS
      const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
      const targetUrl = 'https://server-hotel-pi.vercel.app/reservation';
      const response = await fetch(proxyUrl + targetUrl)
  
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



  {/*Eliminar ordenes*/}
  const deleteOrder = async (id) => {
    const response = await fetch(`https://backend-restaurante.deyvids.dev/api/v1/Category/Delete/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      fetchItems(currentPage)
    }
  }




  return (
    <div className=' py-6 px-7 w-full flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gris-oscuro dark:text-gray-200'>
      <table className='table-auto border border-gray-200 dark:border-gray-500 w-full'>
        <thead>
          <tr>
            <th className="pl-3 py-4 text-left pr-4">ID</th>
            <th className="pl-3 py-4 text-left pr-4">CLIENTE</th>
            <th className="pl-3 py-4 text-left pr-4">DNI</th>
            <th className="pl-3 py-4 text-left pr-4">HORA</th>
            <th className="pl-3 py-4 text-left pr-4">DIA</th>
            <th className="pl-3 py-4 text-left pr-4">ESTADO</th>
            <th className="pl-3 py-4 text-left pr-4">PISO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='border border-gray-200 dark:border-gray-500'>
              {Object.entries(row).map(([key, value], cellIndex) => {
                const keyBase = `${rowIndex}-${cellIndex}`
                if (key === 'image') {
                  return (
                    <td key={keyBase} className="py-4 pl-3 pr-4 dark:text-gray-200">
                      <img src={value} alt="Room" className="w-20 h-20 object-cover" />
                    </td>
                  );
                }
                return <td key={keyBase} className="py-4 pl-3 pr-4 dark:text-gray-200">{value}</td>;
              })}
              {/* <td className='w-64 '>
                <div className='flex justify-between'>
                  <button onClick={() => deleteOrder(row.id)} className='bg-gray-300 text-gray-500 font-semibold px-3 py-2'>Borrar</button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableReservas;