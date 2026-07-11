import { Select } from 'antd';
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY } from '../config/currencies';

export const CurrencySelector = ({ value, onChange }) => {
  const currencyOptions = Object.entries(SUPPORTED_CURRENCIES).map(
    ([code, { name, symbol }]) => ({
      label: `${name} (${symbol})`,
      value: code,
    })
  );

  return (
    <Select
      placeholder="Select Currency"
      defaultValue={DEFAULT_CURRENCY}
      value={value}
      onChange={onChange}
      options={currencyOptions}
      style={{ width: '100%' }}
    />
  );
};