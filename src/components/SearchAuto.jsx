import React from "react";
import { AutoComplete } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchAuto = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const options = [
    { value: 'estate', label: t('estate') },
    { value: 'transport', label: t('transport') },
    { value: 'electronics', label: t('electronics') },
    { value: 'clothes', label: t('clothes') },
    { value: 'house_goods', label: t('house_goods') },
    { value: 'building_materials_and_tools', label: t('building_materials_and_tools') },
    { value: 'transport_goods', label: t('transport_goods') },
    { value: 'petSupplies', label: t('petSupplies') },
    { value: 'home_appliance', label: t('home_appliance') },
    { value: 'service', label: t('service') },
    { value: 'child_goods', label: t('child_goods') },
    { value: 'health_and_beauty', label: t('health_and_beauty') },
    { value: 'sport', label: t('sport') },
    { value: 'hobby_n_Relax', label: t('hobby_n_Relax') },
    { value: 'rest', label: t('rest') },
  ];

  const handleSelect = (value) => {
    history.push(`/advertisments/${value}`);
  };

  return (
    <AutoComplete
      style={{
        width: '100%',
        height: '40px',
      }}
      options={options.map(option => ({ value: option.value, label: option.label }))}
      placeholder={t('search')}
      filterOption={(inputValue, option) =>
        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={handleSelect}
    />
  );
};

export default SearchAuto;