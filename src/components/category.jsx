import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Button, Modal, Select, InputNumber, AutoComplete } from 'antd';
import Logo from '../assets/new_logo.png'
import { useTranslation } from 'react-i18next';

const Categories = ({ setSearchText, options }) => {
  const { t } = useTranslation();
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [inputValue, setInputValue] = useState('');

  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const items = [
    {
      key: '1',
      label: (
        <Link to="/advertisments/estate" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('estate')}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/advertisments/transport" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('transport')}
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/advertisments/electronics" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('electronics')}
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="/advertisments/clothes" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('clothes')}
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link to="/advertisments/house_goods" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('house_goods')}
        </Link>
      ),
    },
    {
      key: '6',
      label: (
        <Link to="/advertisments/building_materials_and_tools" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('building_materials_and_tools')}
        </Link>
      ),
    },
    {
      key: '7',
      label: (
        <Link to="/advertisments/transport_goods" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('transport_goods')}
        </Link>
      ),
    },
    {
      key: '8',
      label: (
        <Link to="/advertisments/petSupplies" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('petSupplies')}
        </Link>
      ),
    },
    {
      key: '9',
      label: (
        <Link to="/advertisments/home_appliance" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('home_appliance')}
        </Link>
      ),
    },
    {
      key: '10',
      label: (
        <Link to="/advertisments/service" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('service')}
        </Link>
      ),
    },
    {
      key: '11',
      label: (
        <Link to="/advertisments/child_goods" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('child_goods')}
        </Link>
      ),
    },
    {
      key: '12',
      label: (
        <Link to="/advertisments/health_and_beauty" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('health_and_beauty')}
        </Link>
      ),
    },
    {
      key: '13',
      label: (
        <Link to="/advertisments/sport" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('sport')}
        </Link>
      ),
    },
    {
      key: '14',
      label: (
        <Link to="/advertisments/hobby_n_Relax" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('hobby_n_Relax')}
        </Link>
      ),
    },
    {
      key: '15',
      label: (
        <Link to="/advertisments/rest" style={{ fontSize: '16px', textDecoration: 'none' }}>
          {t('rest')}
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className='d-none d-lg-block' style={{ marginTop: '20px' }}>
        <div className='container mb-3' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className='logo' style={{ marginRight: '20px' }}>
            <a href='/'>
              <img src={Logo} alt='logo' style={{ width: '100px', height: 'auto' }}></img>
            </a>
          </div>
          <AutoComplete
            options={filteredOptions}
            style={{ width: 1000 }}
            size='large'
            onSelect={value => setSearchText(value)}
            onSearch={value => setInputValue(value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                setSearchText(inputValue);
              }
            }}
            placeholder={t('search')}
          />
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button style={{ marginRight: '20px', backgroundColor: '#FFBF34', color: 'white', border: 'none' }} size='large' icon={<MenuOutlined />}>
                {t('category')}
              </Button>
            </a>
          </Dropdown>
        </div>
      </div>

      <div className='d-lg-none mt-3'>
        <div className='logo mb-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt='logo' style={{ width: '120px', height: 'auto' }}></img>
        </div>
        <div className='container mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button style={{ marginRight: '20px', backgroundColor: '#FFBF34', color: 'white', border: 'none' }} size='large' icon={<MenuOutlined />}>
              </Button>
            </a>
          </Dropdown>
          <AutoComplete
            options={filteredOptions}
            style={{ width: 400 }}
            size='large'
            onSelect={value => setSearchText(value)}
            onSearch={value => setInputValue(value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                setSearchText(inputValue);
              }
            }}
            placeholder="input search text"
          />
        </div>
        <div className='container'>
        </div>
      </div>
    </>

  );
};

export default Categories;
