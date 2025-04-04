
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Check which section is currently visible
      const sections = ['hero', 'services', 'about', 'team', 'plans', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top <= 300 && rect.bottom >= 300;
          if (isInViewport) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Map sections to their corresponding navigation links
  const sectionToNavMap = {
    'hero': '/',
    'services': '/services',
    'about': '/about',
    'contact': '/contact'
  };
  
  // Function to determine link color based on active section and current route
  const getLinkColor = (path) => {
    // On routes other than homepage, use simple active/inactive colors
    if (location.pathname !== '/') {
      return location.pathname === path ? 'text-scarlet-600' : 'text-gray-700 hover:text-scarlet-600';
    }
    
    // On homepage, color based on active section
    const currentSection = Object.entries(sectionToNavMap).find(([_, navPath]) => navPath === path)?.[0];
    
    if (currentSection === activeSection) {
      // Colors based on section
      if (activeSection === 'services') return 'text-scarlet-600';
      if (activeSection === 'about') return 'text-blue-600';
      if (activeSection === 'contact') return 'text-green-600';
      return 'text-scarlet-600'; // Default active color
    }
    
    return 'text-gray-700 hover:text-scarlet-600'; // Default inactive color
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-3'}`}>
      {/* Top bar with contact info and social media links */}
      <div className="text-white py-2 hidden md:block bg-scarlet-600">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="mailto:contato@contaconnection.com.br" className="flex items-center text-sm hover:text-scarlet-100 transition-colors">
              <Mail className="w-4 h-4 mr-1" />
              contato@contaconnection.com.br
            </a>
            <a href="tel:+551199999999" className="flex items-center text-sm hover:text-scarlet-100 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              (11) 9999-9999
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center rounded-full bg-scarlet-500 hover:bg-scarlet-400 transition-colors">
              <Facebook className="w-3 h-3" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center rounded-full bg-scarlet-500 hover:bg-scarlet-400 transition-colors">
              <Instagram className="w-3 h-3" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center rounded-full bg-scarlet-500 hover:bg-scarlet-400 transition-colors">
              <Twitter className="w-3 h-3" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center rounded-full bg-scarlet-500 hover:bg-scarlet-400 transition-colors">
              <Linkedin className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className={`container mx-auto px-4 ${isScrolled ? 'bg-white' : ''}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-scarlet-700">Conta</span>
            <span className="text-xl font-bold text-gray-800">Connection</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className={`text-sm font-medium ${getLinkColor('/')} transition-colors duration-300`}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/about" className={`text-sm font-medium ${getLinkColor('/about')} transition-colors duration-300`}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/services" className={`text-sm font-medium ${getLinkColor('/services')} transition-colors duration-300`}>
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`text-sm font-medium ${getLinkColor('/contact')} transition-colors duration-300`}>
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="block md:hidden text-gray-700" onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="fixed inset-0 bg-white z-50 pt-16">
          <div className="container mx-auto px-4">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link to="/" className={`text-lg font-medium ${getLinkColor('/')} block py-2`}>
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={`text-lg font-medium ${getLinkColor('/about')} block py-2`}>
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link to="/services" className={`text-lg font-medium ${getLinkColor('/services')} block py-2`}>
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={`text-lg font-medium ${getLinkColor('/contact')} block py-2`}>
                    Contato
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Contato</h3>
              <div className="flex flex-col space-y-3">
                <a href="mailto:contato@contaconnection.com.br" className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-scarlet-600" />
                  contato@contaconnection.com.br
                </a>
                <a href="tel:+551199999999" className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-scarlet-600" />
                  (11) 9999-9999
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Siga-nos</h3>
              <div className="flex space-x-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-scarlet-100 text-scarlet-600">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-scarlet-100 text-scarlet-600">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-scarlet-100 text-scarlet-600">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-scarlet-100 text-scarlet-600">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Close button for mobile menu */}
            <button 
              onClick={toggleMenu} 
              className="absolute top-4 right-4 p-2 rounded-full bg-scarlet-100 text-scarlet-600 hover:bg-scarlet-200 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
