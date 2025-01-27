import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button,Card, CardContent } from '../components/Button';

const Datatable = () => {
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({ nombre: '', precio: '' });
  const [editProducto, setEditProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});


  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/productos/');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/productos/', newProducto);
      setProductos([...productos, response.data]);
      setNewProducto({ nombre: '', precio: '' });
    } catch (error) {
      if (error.response || error.response.data) {
        setError(error.response.data.errors || 'Error al agregar el producto.');
      } else {
        setError('Error al conectar con el servidor.');
      }
      console.error('Error adding producto:', error);    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/productos/${editProducto.id}`, editProducto);
      setProductos(productos.map((prod) => (prod.id === editProducto.id ? response.data : prod)));
      setEditProducto(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error al editar el producto.');
      } else {
        setError('Error al conectar con el servidor.');
      }
      console.error('Error editing producto:', error);    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/productos/${id}`);
      setProductos(productos.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error('Error deleting producto:', error);
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
      <h1 className="text-center text-xl font-weight-bold mb-4">Gestión de Productos</h1>
      <div className="container mt-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={newProducto.nombre}
                onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                id="descripcion"
                placeholder="Descripción"
                value={newProducto.descripcion}
                onChange={(e) => setNewProducto({ ...newProducto, descripcion: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                placeholder="Precio"
                value={newProducto.precio}
                onChange={(e) => setNewProducto({ ...newProducto, precio: e.target.value })}
                className={`form-control ${errors.precio ? "is-invalid" : ""}`}
              />
              {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                placeholder="Cantidad"
                value={newProducto.cantidad}
                onChange={(e) => setNewProducto({ ...newProducto, cantidad: e.target.value })}
                className={`form-control ${errors.cantidad ? "is-invalid" : ""}`}
              />
              {errors.cantidad && <div className="invalid-feedback">{errors.cantidad}</div>}
            </div>

            <div className="col-12 text-end">
              <button onClick={handleAdd} className="btn btn-primary">
                Agregar
              </button>
            </div>
          </div>
        </div>



        {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>
                        {editProducto && editProducto.id === producto.id ? (
                          <input
                            type="text"
                            value={editProducto.nombre}
                            onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
                            className="form-control"
                          />
                        ) : (
                          producto.nombre
                        )}
                      </td>
                      <td>
                        {editProducto && editProducto.id === producto.id ? (
                          <input
                            type="text"
                            value={editProducto.descripcion}
                            onChange={(e) => setEditProducto({ ...editProducto, descripcion: e.target.value })}
                            className="form-control"
                          />
                        ) : (
                          producto.descripcion
                        )}
                      </td>
                      <td>
                        {editProducto && editProducto.id === producto.id ? (
                          <input
                            type="number"
                            value={editProducto.precio}
                            onChange={(e) => setEditProducto({ ...editProducto, precio: e.target.value })}
                            className="form-control"
                          />
                        ) : (
                          producto.precio
                        )}
                      </td>
                      <td>
                        {editProducto && editProducto.id === producto.id ? (
                          <input
                            type="number"
                            value={editProducto.cantidad}
                            onChange={(e) => setEditProducto({ ...editProducto, cantidad: e.target.value })}
                            className="form-control"
                          />
                        ) : (
                          producto.cantidad
                        )}
                      </td>
                      <td className="d-flex gap-2">
                        {editProducto && editProducto.id === producto.id ? (
                          <button className="btn btn-success" onClick={handleEdit}>Guardar</button>
                        ) : (
                          <button className="btn btn-warning" onClick={() => setEditProducto(producto)}>Editar</button>
                        )}
                        <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

      </CardContent>
    </Card>
  );
};

export default Datatable;
