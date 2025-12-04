import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Save, X, Trash2, Loader, AlertCircle } from 'lucide-react';
import { api, type User as UserType } from '../services/api';
import { useAuth } from '../context/useAuth';

export const Profile: React.FC = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await api.getUserById(userId);
        console.log(userData);
        setUser(userData);
        setFormData({
          firstName: `${userData.firstName|| ''}`.trim(),
          lastName: `${userData.lastName || ''}`.trim(),
          email: userData.email || '',
          username: userData.username || '',
          password: '',
          dateOfBirth: userData.dateOfBirth || '',
          address: userData.address || '',
          phoneNumber: userData.phoneNumber || '',
        });
      } catch {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!userId) return;

    setError('');
    setSuccess('');

    try {
      await api.updateUser(userId, formData);
      const updatedUser = await api.getUserById(userId);
      setUser(updatedUser);
      setEditing(false);
      setSuccess('Perfil actualizado exitósamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar perfil');
    }
  };

  const handleDelete = async () => {
    if (!userId) return;

    if (!window.confirm('¿Estás seguro de querer borrar tu cuenta? Esto no se puede revertir.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      await api.deleteUser(userId);
      logout();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al borrar la cuenta');
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Mi perfil</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="ml-3">{error}</div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {!editing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Nombres</p>
                  <p className="text-lg text-slate-900">
                    {user?.firstName} 
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Apellidos</p>
                  <p className="text-lg text-slate-900">
                    {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Nombre de usuario</p>
                  <p className="text-lg text-slate-900">{user?.username}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Email</p>
                <p className="text-lg text-slate-900">{user?.email}</p>
              </div>

              {user?.dateOfBirth && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Fecha de Nacimiento</p>
                    <p className="text-lg text-slate-900">{user.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Número de Teléfono</p>
                    <p className="text-lg text-slate-900">{user.phoneNumber || 'No ingresado'}</p>
                  </div>
                </div>
              )}

              {user?.address && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Dirección</p>
                  <p className="text-lg text-slate-900">{user.address}</p>
                </div>
              )}

              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  <User className="w-4 h-4" />
                  Editar Perfil
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 bg-red-100 hover:bg-red-200 disabled:bg-slate-200 text-red-700 disabled:text-slate-500 px-6 py-2 rounded-lg transition"
                >
                  {deleting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Borrando...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Borrar Cuenta
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombres
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de usuario
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                  Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                Dirección
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
