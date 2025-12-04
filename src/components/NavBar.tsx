import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, FileText, Briefcase, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-blue-600">
              InsightFlow
            </div>

            {isAuthenticated && (
              <div className="flex items-center gap-6">
                <Link
                  to="/user"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition font-medium"
                >
                  <User className="w-4 h-4" />
                  Usuario
                </Link>
                <Link
                  to="/documents"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition font-medium"
                >
                  <FileText className="w-4 h-4" />
                  Documentos
                </Link>
                <Link
                  to="/workspace"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition font-medium"
                >
                  <Briefcase className="w-4 h-4" />
                  Workspace
                </Link>
              </div>
            )}
          </div>

          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition font-medium"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
              >
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
