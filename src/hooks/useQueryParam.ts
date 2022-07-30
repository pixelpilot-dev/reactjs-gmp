import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQueryParam = (key: string) => {
  const toStringQuery = param => {
    return param === 'null' ? null : param;
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);
  const value = useMemo(() => toStringQuery(paramValue), [paramValue]);

  const setValue = useCallback(
    (newValue, options) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (!newValue) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, newValue);
      }

      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams],
  );

  return [value, setValue];
};

export default useQueryParam;
