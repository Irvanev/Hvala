import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Input, Button, Modal, Select, InputNumber } from 'antd';
import Logo from '../assets/hvala.png'
import { t } from 'i18next';

const Categories = () => {
  const { Search } = Input;
  const { Option } = Select;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <div className='container mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='logo' style={{marginRight: '20px'}}>
        <img src={Logo} alt='logo' style={{height: '40px', width: '160px'}}></img>
      </div>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Button style={{ marginRight: '20px', backgroundColor: 'orange', color: 'white', border: 'none' }} size='large' icon={<MenuOutlined />}>
            Категории
          </Button>
        </a>
      </Dropdown>
      <Search placeholder="input search text" onSearch={onSearch} size='large' />
      <Button onClick={showModal} style={{ marginLeft: '20px', backgroundColor: 'orange', color: 'white', border: 'none' }} size='large' icon={<MoreOutlined />}>
        Фильтры
      </Button>
      <Modal title="Фильтры" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>Диапазон цен:</p>
          <div>
            <InputNumber
              defaultValue={0}
              formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
              style={{marginRight: '20px'}}
            />
            <InputNumber
              defaultValue={0}
              formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            />
          </div>
          <p>Выбор страны:</p>
          <Select defaultValue="Россия" style={{ width: 240 }}>
            <Option value="Россия">Россия</Option>
            <Option value="США">США</Option>
            <Option value="Китай">Китай</Option>
          </Select>
          <Button className='mt-3' type='primary' style={{ backgroundColor: 'orange', border: 'none' }}>Применить</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
