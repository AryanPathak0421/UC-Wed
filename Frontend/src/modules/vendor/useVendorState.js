import { useCallback, useEffect, useState } from 'react';
import { defaultVendorState } from './vendorStore';
import { vendorApi } from './vendorApi';

export const useVendorState = () => {
  const [vendorState, setVendorState] = useState(defaultVendorState);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await vendorApi.getProfile(token);
          if (res.success && res.data) {
            setVendorState((prev) => ({ ...prev, ...res.data }));
          }
        } catch (err) {
          console.error('Failed to sync vendor state with backend on mount:', err);
        }
      };
      fetchProfile();
    }
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
