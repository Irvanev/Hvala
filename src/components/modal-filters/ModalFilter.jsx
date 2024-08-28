import React from 'react';
import { Modal, Select, InputNumber, Space, Button } from 'antd';

const MoadlFilter = ({
    t,
    isModalVisibleFilter,
    handleCancelFilter,
    handleCurrencyChange,
    minPrice,
    handleMinPriceChange,
    maxPrice,
    handleMaxPriceChange,
    handleCountryChange,
    country,
    countryRegions,
    handleRegionChange,
    region,
    categories,
    handleCategoryChange,
    category,
    subcategories,
    subcategory,
    handleSubcategoryChange,
    renderForm,
    applyFilters,
    resetFilters
}) => {
    return (
        <Modal title={t('filter')} open={isModalVisibleFilter} footer={null} onCancel={handleCancelFilter}>
            <label className='mt-3'>{t('prices')}</label>
            <Space style={{ width: '100%' }} align="baseline">
                <Select defaultValue={t('currency')} onChange={handleCurrencyChange} style={{ width: 120 }}>
                    <Select.Option value="rsd">RSD</Select.Option>
                    <Select.Option value="eur">EUR</Select.Option>
                </Select>
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('minPricePlaceholder')}
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder={t('maxPricePlaceholder')}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </Space>
            <label className='mt-3'>{t('country')}</label>
            <Select
                style={{ width: '100%' }}
                placeholder={t('choice_country')}
                options={[
                    { value: 'serbia', label: t('serbia') },
                    { value: 'montenegro', label: t('montenegro') },
                    { value: 'croatia', label: t('croatia') },
                    { value: 'bosnia_and_herzegovina', label: t('bosnia_and_herzegovina') },
                ]}
                onChange={handleCountryChange}
            />
            {country && (
                <>
                    <label className='mt-3'>{t('region')}</label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder={t('choice_region')}
                        options={countryRegions[country]}
                        onChange={handleRegionChange}
                        value={region}
                    />
                </>
            )}
            <label className='mt-3'>{t('category')}</label>
            <Select
                style={{ width: '100%' }}
                placeholder={t('choice_category')}
                options={categories}
                onChange={handleCategoryChange}
            />
            {category && (
                <>
                    <label className='mt-3'>{t('subCategory')}</label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder={t('choice_subcategory')}
                        options={subcategories[category]}
                        onChange={handleSubcategoryChange}
                        value={subcategory}
                    />
                </>
            )}
            {renderForm()}

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button className='mt-3' type='primary' onClick={applyFilters}
                    style={{ backgroundColor: '#FFBF34', border: 'none' }}>{t('apply')}</Button>
                <Button className='mt-3' type='default' onClick={resetFilters}
                    style={{ marginLeft: '10px' }}>{t('reset')}</Button>
            </div>
        </Modal>
    );
};

export default MoadlFilter;