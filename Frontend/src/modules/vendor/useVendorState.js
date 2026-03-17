import { useCallback, useEffect, useState } from 'react';
import { loadVendorState, saveVendorState } from './vendorStore';

export const useVendorState = () => {
  const [vendorState, setVendorState] = useState(loadVendorState);

  useEffect(() => {
    if (vendorState && vendorState.leads && Object.keys(vendorState).length > 0) {
      console.log('Pushing vendor state to LocalStorage');
      saveVendorState(vendorState);
    }
  }, [vendorState]);

  useEffect(() => {
    const handleSync = () => {
      console.log('Reloading vendor state from LocalStorage (Sync/Focus)');
      setVendorState(loadVendorState());
    };

    window.addEventListener('storage', (e) => {
      if (e.key === 'vendor-panel-state') handleSync();
    });
    window.addEventListener('focus', handleSync);
    
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  const updateVendorState = useCallback((patch) => {
    setVendorState((prev) => {
      const next = { ...prev, ...patch };
      console.log('Update vendor state:', patch);
      return next;
    });
  }, []);

  return { vendorState, setVendorState, updateVendorState };
};
