import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WeddingDetailsForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Event categories configuration
  const eventCategories = {
    wedding: {
      label: 'Wedding',
      icon: 'rings',
      subcategories: [
        { id: 'engagement', label: 'Engagement' },
        { id: 'mehendi', label: 'Mehendi' },
        { id: 'haldi', label: 'Haldi' },
        { id: 'sangeet', label: 'Sangeet' },
        { id: 'wedding', label: 'Wedding Ceremony' },
        { id: 'reception', label: 'Reception' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        brideName: { label: "Bride's Name", type: 'text', required: true },
        groomName: { label: "Groom's Name", type: 'text', required: true },
        weddingDate: { label: 'Wedding Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        weddingTheme: { label: 'Wedding Theme/Style', type: 'text', required: false },
        specialRequirements: { label: 'Notes/Special Requirements', type: 'textarea', required: false }
      }
    },
    birthday: {
      label: 'Birthday',
      icon: 'cake',
      subcategories: [
        { id: 'kids_party', label: 'Kids Party' },
        { id: 'theme_party', label: 'Theme Party' },
        { id: 'milestone', label: 'Milestone Birthday' },
        { id: 'surprise', label: 'Surprise Party' },
        { id: 'dinner', label: 'Birthday Dinner' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        personName: { label: "Birthday Person's Name", type: 'text', required: true },
        age: { label: 'Age', type: 'number', required: true },
        eventDate: { label: 'Birthday Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Party Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    anniversary: {
      label: 'Anniversary',
      icon: 'heart',
      subcategories: [
        { id: 'silver', label: 'Silver Jubilee' },
        { id: 'golden', label: 'Golden Jubilee' },
        { id: 'vow_renewal', label: 'Vow Renewal' },
        { id: 'intimate_dinner', label: 'Intimate Dinner' },
        { id: 'grand_party', label: 'Grand Celebration' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        coupleNames: { label: "Couple's Names", type: 'text', required: true },
        years: { label: 'Years Celebrated', type: 'number', required: true },
        eventDate: { label: 'Anniversary Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Celebration Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    corporate: {
      label: 'Corporate Event',
      icon: 'briefcase',
      subcategories: [
        { id: 'seminar', label: 'Seminar' },
        { id: 'workshop', label: 'Workshop' },
        { id: 'team_building', label: 'Team Building' },
        { id: 'award_show', label: 'Award Ceremony' },
        { id: 'product_launch', label: 'Product Launch' },
        { id: 'annual_party', label: 'Annual Party' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        companyName: { label: 'Company Name', type: 'text', required: true },
        eventType: { label: 'Event Type', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Expected Attendees', type: 'number', required: true },
        purpose: { label: 'Event Purpose', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    others: {
      label: 'Others',
      icon: 'sparkles',
      subcategories: [
        { id: 'exhibition', label: 'Exhibition' },
        { id: 'fair', label: 'Fair' },
        { id: 'religious', label: 'Religious Event' },
        { id: 'gathering', label: 'Social Gathering' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        eventName: { label: 'Event Name', type: 'text', required: true },
        organizerName: { label: 'Organizer Name', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Expected Guests', type: 'number', required: true },
        eventType: { label: 'Event Type/Category', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    baby_shower: {
      label: 'Baby Shower',
      icon: 'heart',
      subcategories: [
        { id: 'godh_bharai', label: 'Godh Bharai' },
        { id: 'gender_reveal', label: 'Gender Reveal' },
        { id: 'baby_homecoming', label: 'Baby Homecoming' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        parentNames: { label: "Parent's Names", type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Shower Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    house_warming: {
      label: 'House Warming',
      icon: 'home',
      subcategories: [
        { id: 'griha_pravesh', label: 'Griha Pravesh Puja' },
        { id: 'house_party', label: 'House Party' },
        { id: 'dinner_celebration', label: 'Dinner Celebration' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        ownerNames: { label: "Owner's Names", type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'New Address/Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    naming_ceremony: {
      label: 'Naming Ceremony',
      icon: 'sparkles',
      subcategories: [
        { id: 'namkaran', label: 'Namkaran Puja' },
        { id: 'cradle_ceremony', label: 'Cradle Ceremony' },
        { id: 'lunch_party', label: 'Lunch Party' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        babyName: { label: "Baby's Name (if decided)", type: 'text', required: false },
        parentNames: { label: "Parent's Names", type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    private_party: {
      label: 'Private Party',
      icon: 'party',
      subcategories: [
        { id: 'kitty_party', label: 'Kitty Party' },
        { id: 'bachelorette', label: 'Bachelorette Party' },
        { id: 'bachelor_party', label: 'Bachelor Party' },
        { id: 'graduation_party', label: 'Graduation Party' },
        { id: 'get_together', label: 'Get Together' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        eventName: { label: 'Event Name', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Party Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    festival: {
      label: 'Festival Celebration',
      icon: 'sparkles',
      subcategories: [
        { id: 'diwali_party', label: 'Diwali Party' },
        { id: 'ganpati_celebration', label: 'Ganpati Celebration' },
        { id: 'holi_bash', label: 'Holi Bash' },
        { id: 'christmas_party', label: 'Christmas Party' },
        { id: 'eid_mubarak', label: 'Eid Celebration' },
        { id: 'new_year_eve', label: 'New Year Eve Bash' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        festivalName: { label: 'Festival Name', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    custom_other: {
      label: 'Other (Specify)',
      icon: 'sparkles',
      subcategories: [
        { id: 'main_ceremony', label: 'Main Ceremony' },
        { id: 'other', label: 'Other' }
      ],
      fields: {
        eventName: { label: 'Event Name', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Expected Guests', type: 'number', required: true },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [otherEventName, setOtherEventName] = useState('');
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    venue: '',
    budget: '',
    guestCount: '',
    weddingTheme: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when category changes
  const initializeFormData = (category) => {
    const fields = eventCategories[category].fields;
    const initialData = {};
    Object.keys(fields).forEach(fieldKey => {
      initialData[fieldKey] = '';
    });
    setFormData(initialData);
    setSelectedSubcategories([]);
    setOtherEventName('');
    setErrors({});
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    initializeFormData(newCategory);
  };

  const toggleSelectAll = () => {
    const allIds = eventCategories[selectedCategory].subcategories.map(sub => sub.id);
    if (selectedSubcategories.length === allIds.length) {
      setSelectedSubcategories([]);
    } else {
      setSelectedSubcategories(allIds);
    }
  };

  const handleSubcategoryToggle = (subId) => {
    setSelectedSubcategories(prev =>
      prev.includes(subId)
        ? prev.filter(id => id !== subId)
        : [...prev, subId]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = eventCategories[selectedCategory].fields;

    Object.keys(fields).forEach(fieldKey => {
      const field = fields[fieldKey];
      if (field.required && !formData[fieldKey]?.trim()) {
        newErrors[fieldKey] = `${field.label} is required`;
      }
    });

    if (selectedSubcategories.includes('other') && !otherEventName.trim()) {
      newErrors.otherEventName = "Please specify the other event name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const eventData = {
        category: selectedCategory,
        categoryLabel: eventCategories[selectedCategory].label,
        subcategories: selectedSubcategories,
        subcategoryLabels: eventCategories[selectedCategory].subcategories
          .filter(sub => selectedSubcategories.includes(sub.id))
          .map(sub => sub.id === 'other' ? (otherEventName || 'Other') : sub.label),
        otherEventName: selectedSubcategories.includes('other') ? otherEventName : '',
        details: formData,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('eventDetails', JSON.stringify(eventData));

      // Initialize planning categories based on event type
      initializePlanningCategories(selectedCategory, formData);

      // Initialize budget data
      initializeBudgetData(formData);

      // Navigate to planning dashboard
      navigate('/user/planning-dashboard');
    }
  };

  // Initialize planning categories based on event type
  const initializePlanningCategories = (eventType, formData) => {
    const baseCategories = {
      wedding: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹1,00,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Makeup', status: 'Pending with Budget', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'makeup' },
        { name: 'Invitations', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'invitations' }
      ],
      birthday: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Entertainment', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'entertainment' },
        { name: 'Cake', status: 'Pending with Discussion', totalBudget: '₹5,000', advancePaid: null, balanceAmount: null, id: 'cake' }
      ],
      anniversary: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Gifts', status: 'Pending with Budget', totalBudget: '₹12,000', advancePaid: null, balanceAmount: null, id: 'gifts' }
      ],
      corporate: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Audio/Visual', status: 'Pending with Budget', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'av' },
        { name: 'Speakers', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'speakers' },
        { name: 'Marketing', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'marketing' }
      ],
      others: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'photography' }
      ],
      baby_shower: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Gifts', status: 'Pending with Budget', totalBudget: '₹5,000', advancePaid: null, balanceAmount: null, id: 'gifts' }
      ],
      house_warming: [
        { name: 'Pandit/Puja', status: 'Pending with Discussion', totalBudget: '₹5,000', advancePaid: null, balanceAmount: null, id: 'pandit' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'photography' }
      ],
      naming_ceremony: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'photography' }
      ],
      private_party: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹40,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Entertainment', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'entertainment' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' }
      ],
      festival: [
        { name: 'Venue/Space', status: 'Pending with Discussion', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration & Props', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Entertainment/Music', status: 'Pending with Discussion', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'entertainment' }
      ],
      custom_other: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'photography' }
      ]
    };

    const categories = baseCategories[eventType] || baseCategories.others;
    localStorage.setItem('planningCategories', JSON.stringify(categories));
  };

  // Initialize budget data based on form data
  const initializeBudgetData = (formData) => {
    const totalBudget = parseInt(formData.budget) || 500000;

    const budgetData = {
      totalBudget,
      spentAmount: 0,
      remainingAmount: totalBudget,
      categories: [
        { name: 'Venue', totalAmount: Math.floor(totalBudget * 0.4), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.4), spent: 0, color: '#ec4899' },
        { name: 'Catering', totalAmount: Math.floor(totalBudget * 0.25), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.25), spent: 0, color: '#10b981' },
        { name: 'Photography', totalAmount: Math.floor(totalBudget * 0.15), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.15), spent: 0, color: '#f59e0b' },
        { name: 'Decoration', totalAmount: Math.floor(totalBudget * 0.1), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.1), spent: 0, color: '#8b5cf6' },
        { name: 'Makeup', totalAmount: Math.floor(totalBudget * 0.05), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.05), spent: 0, color: '#06b6d4' },
        { name: 'Others', totalAmount: Math.floor(totalBudget * 0.05), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.05), spent: 0, color: '#ef4444' }
      ]
    };

    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  };

  const handleSkip = () => {
    navigate('/user/dashboard');
  };

  return (
    <div
      className="min-h-screen px-4 py-8 pb-24"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary[100] }}
          >
            <Icon name={eventCategories[selectedCategory].icon} size="2xl" style={{ color: theme.colors.primary[500] }} />
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            📝 Event Details
          </h1>
          <p
            className="text-sm mb-6"
            style={{ color: theme.semantic.text.secondary }}
          >
            Select your event type and fill in the details to get personalized recommendations
          </p>

          {/* Event Category Dropdown */}
          <div className="max-w-md mx-auto">
            <label
              className="block text-sm font-semibold mb-2 text-left"
              style={{ color: theme.colors.primary[600] }}
            >
              Select Event Category: *
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors"
              style={{
                backgroundColor: theme.semantic.input.background,
                borderColor: theme.semantic.border.primary,
                color: theme.semantic.text.primary
              }}
            >
              {Object.keys(eventCategories).map(key => (
                <option key={key} value={key}>
                  {eventCategories[key].label}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategories Checkboxes */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex items-center justify-between mb-3">
              <label
                className="block text-sm font-semibold text-left"
                style={{ color: theme.colors.primary[600] }}
              >
                Select Events to Include:
              </label>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-xs font-bold transition-colors hover:opacity-70"
                style={{ color: theme.colors.primary[500] }}
              >
                {selectedSubcategories.length === eventCategories[selectedCategory].subcategories.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {eventCategories[selectedCategory].subcategories.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => handleSubcategoryToggle(sub.id)}
                  className={`flex items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${selectedSubcategories.includes(sub.id)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent bg-white shadow-sm'
                    }`}
                  style={{
                    borderColor: selectedSubcategories.includes(sub.id) ? theme.colors.primary[500] : 'transparent',
                    backgroundColor: selectedSubcategories.includes(sub.id) ? `${theme.colors.primary[500]}10` : theme.semantic.background.primary
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center mr-3 transition-colors ${selectedSubcategories.includes(sub.id) ? 'bg-primary-500' : 'border-2 border-gray-300'
                      }`}
                    style={{
                      backgroundColor: selectedSubcategories.includes(sub.id) ? theme.colors.primary[500] : 'transparent'
                    }}
                  >
                    {selectedSubcategories.includes(sub.id) && (
                      <Icon name="check" size="xs" color="white" />
                    )}
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {sub.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Other Event Specification Field */}
            {selectedSubcategories.includes('other') && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <label
                  className="block text-sm font-semibold mb-2 text-left"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Specify 'Other' Event Name: *
                </label>
                <Input
                  type="text"
                  value={otherEventName}
                  onChange={(e) => setOtherEventName(e.target.value)}
                  placeholder="e.g. Pool Party, Prayer Meeting, etc."
                  className={errors.otherEventName ? 'border-red-500' : ''}
                />
                {errors.otherEventName && (
                  <p className="text-xs text-red-500 mt-1">{errors.otherEventName}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic Form Fields */}
          {(() => {
            const fields = eventCategories[selectedCategory].fields;
            const fieldKeys = Object.keys(fields);

            // Group fields into pairs for two-column layout
            const fieldPairs = [];
            for (let i = 0; i < fieldKeys.length; i += 2) {
              fieldPairs.push(fieldKeys.slice(i, i + 2));
            }

            return fieldPairs.map((pair, pairIndex) => (
              <div
                key={pairIndex}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: theme.semantic.background.primary }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pair.map(fieldKey => {
                    const field = fields[fieldKey];
                    const isTextarea = field.type === 'textarea';

                    return (
                      <div key={fieldKey} className={pair.length === 1 ? 'md:col-span-2' : ''}>
                        <label
                          className="block text-sm font-semibold mb-2"
                          style={{ color: theme.colors.primary[600] }}
                        >
                          {field.label} {field.required && '*'}
                        </label>

                        {isTextarea ? (
                          <textarea
                            name={fieldKey}
                            value={formData[fieldKey] || ''}
                            onChange={handleChange}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            rows="4"
                            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none ${errors[fieldKey] ? 'border-red-500' : ''
                              }`}
                            style={{
                              backgroundColor: theme.semantic.input.background,
                              borderColor: errors[fieldKey]
                                ? '#ef4444'
                                : theme.semantic.border.primary,
                              color: theme.semantic.text.primary
                            }}
                          />
                        ) : (
                          <div className={field.prefix ? 'relative' : ''}>
                            {field.prefix && (
                              <span
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: theme.semantic.text.secondary }}
                              >
                                {field.prefix}
                              </span>
                            )}
                            <Input
                              type={field.type}
                              name={fieldKey}
                              value={formData[fieldKey] || ''}
                              onChange={handleChange}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className={`${errors[fieldKey] ? 'border-red-500' : ''} ${field.prefix ? 'pl-8' : ''
                                }`}
                            />
                          </div>
                        )}

                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">{errors[fieldKey]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}

          {/* Info Tip */}
          <div
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: theme.colors.secondary[50] }}
          >
            <Icon name="lightbulb" size="md" style={{ color: theme.colors.secondary[500] }} />
            <p
              className="text-xs"
              style={{ color: theme.semantic.text.secondary }}
            >
              💡 Tip: Providing accurate details helps us recommend the best vendors and services for your {eventCategories[selectedCategory].label.toLowerCase()}!
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full py-4 text-base font-bold"
              style={{
                backgroundColor: theme.colors.primary[500],
                color: 'white'
              }}
            >
              Continue to Planning Dashboard →
            </Button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 text-sm font-medium rounded-xl transition-colors"
              style={{
                color: theme.semantic.text.secondary,
                backgroundColor: 'transparent'
              }}
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingDetailsForm;
