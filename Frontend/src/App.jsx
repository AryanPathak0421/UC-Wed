import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { LenisProvider } from './providers/LenisProvider';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-theme-card">
                <AppRouter />
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}

export default App;
