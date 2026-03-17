import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { familyContacts } from '../../../data/contacts';

const FamilyContacts = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Detect keyboard open/close on mobile
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.screen.height;
      const keyboardThreshold = windowHeight * 0.75;
      
      setIsKeyboardOpen(viewportHeight < keyboardThreshold);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport.removeEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Filter contacts based on search query
  const filteredContacts = familyContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.relation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactToggle = (contactId) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const handleCreateGroup = () => {
    if (selectedContacts.length < 2) {
      alert('Please select at least 2 contacts to create a group');
      return;
    }
    
    // Navigate to group creation page with selected contacts
    navigate('/user/family/create-group', { 
      state: { selectedContacts: selectedContacts }
    });
  };

  const getRelationColor = (relation) => {
    if (relation.includes('Bride')) return theme.colors.primary[500];
    if (relation.includes('Groom')) return theme.colors.secondary[500];
    if (relation.includes('Mother') || relation.includes('Father')) return theme.colors.accent[500];
    return theme.semantic.text.secondary;
  };

  return (
    <div 
      className={`min-h-screen ${isKeyboardOpen ? 'keyboard-open pb-4' : 'pb-20'}`} 
      style={{ backgroundColor: theme.semantic.background.primary }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-4 py-4 border-b backdrop-blur-sm"
        style={{ 
          backgroundColor: `${theme.semantic.background.primary}95`,
          borderBottomColor: theme.semantic.border.light 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full"
              style={{ backgroundColor: theme.semantic.background.accent }}
            >
              <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
            </button>
            <div>
              <h1 className="text-lg font-bold" style={{ color: theme.semantic.text.primary }}>
                Select Family & Friends
              </h1>
              <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                Choose people to add to your wedding group
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSelectAll}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.primary[100],
              color: theme.colors.primary[700]
            }}
          >
            {selectedContacts.length === filteredContacts.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <Icon 
              name="search" 
              size="sm" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: theme.semantic.text.secondary }}
            />
            <input
              type="text"
              placeholder="Search by name or relation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 text-sm"
              style={{
                backgroundColor: theme.semantic.card.background,
                borderColor: theme.semantic.card.border,
                borderWidth: '1px',
                color: theme.semantic.text.primary,
                '--tw-ring-color': theme.colors.primary[500],
                fontSize: '16px' // Prevent zoom on iOS
              }}
            />
          </div>
        </div>
      </div>

      {/* Selected Count */}
      {selectedContacts.length > 0 && (
        <div className="px-4 py-3">
          <div 
            className="px-4 py-2 rounded-lg flex items-center justify-between"
            style={{ backgroundColor: theme.colors.accent[50] }}
          >
            <span className="text-sm font-medium" style={{ color: theme.colors.accent[700] }}>
              {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
            </span>
            <Icon name="users" size="sm" style={{ color: theme.colors.accent[600] }} />
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className={`px-4 space-y-3 ${selectedContacts.length > 0 ? 'pb-24' : 'pb-4'}`}>
        {filteredContacts.map((contact) => {
          const isSelected = selectedContacts.includes(contact.id);
          
          return (
            <Card 
              key={contact.id}
              className={`transition-all duration-200 cursor-pointer ${
                isSelected ? 'ring-2 scale-[1.02]' : 'hover:scale-[1.01]'
              }`}
              style={{
                backgroundColor: isSelected 
                  ? theme.colors.primary[50] 
                  : theme.semantic.card.background,
                borderColor: isSelected 
                  ? theme.colors.primary[200] 
                  : theme.semantic.card.border,
                '--tw-ring-color': theme.colors.primary[500]
              }}
              onClick={() => handleContactToggle(contact.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face';
                        }}
                      />
                      {/* Online Status */}
                      {contact.isOnline && (
                        <div 
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                          style={{ backgroundColor: theme.colors.accent[500] }}
                        />
                      )}
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 
                          className="font-semibold text-base truncate"
                          style={{ color: theme.semantic.text.primary }}
                        >
                          {contact.name}
                        </h3>
                        {contact.role === 'admin' && (
                          <div 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: theme.colors.accent[100],
                              color: theme.colors.accent[700]
                            }}
                          >
                            Admin
                          </div>
                        )}
                      </div>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: getRelationColor(contact.relation) }}
                      >
                        {contact.relation}
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: theme.semantic.text.secondary }}
                      >
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className="flex items-center space-x-2">
                    {isSelected ? (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.colors.primary[500] }}
                      >
                        <Icon name="check" size="xs" style={{ color: 'white' }} />
                      </div>
                    ) : (
                      <div 
                        className="w-6 h-6 rounded-full border-2"
                        style={{ borderColor: theme.semantic.border.primary }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="search" size="xl" style={{ color: theme.semantic.text.secondary }} />
          </div>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            No contacts found
          </h3>
          <p 
            className="text-center max-w-sm"
            style={{ color: theme.semantic.text.secondary }}
          >
            Try adjusting your search terms to find the contacts you're looking for.
          </p>
        </div>
      )}

      {/* Create Group Button */}
      {selectedContacts.length > 0 && (
        <div 
          className={`${isKeyboardOpen ? 'fixed' : 'fixed'} bottom-0 left-0 right-0 p-4 border-t backdrop-blur-sm z-50`}
          style={{ 
            backgroundColor: `${theme.semantic.background.primary}F0`,
            borderTopColor: theme.semantic.border.light,
            boxShadow: `0 -4px 20px ${theme.semantic.card.shadow}`,
            transform: isKeyboardOpen ? 'translateY(-env(keyboard-inset-height, 0px))' : 'none'
          }}
        >
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleCreateGroup}
              className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: theme.colors.primary[500],
                color: 'white',
                boxShadow: `0 4px 20px ${theme.colors.primary[500]}40`,
                minHeight: '56px'
              }}
            >
              <Icon name="users" size="sm" />
              <span>Create Group ({selectedContacts.length})</span>
              <Icon name="chevronRight" size="sm" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyContacts;