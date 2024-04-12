import React from "react";
import { Form } from "react-bootstrap";

const SelectCategory = ({ handleCategoryChange, t }) => {
    return ( 
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleCategoryChange}>
            <option>{t('choce_category')}</option>
            <option value="estate">{t('estate')}</option>
            <option value="transport">{t('transport')}</option>
            <option value="clothes">{t('clothes')}</option>
            <option value="electronics">{t('electronics')}</option>
            <option value="house_goods">{t('house_goods')}</option>
            <option value="building_materials_and_tools">{t('building_materials_and_tools')}</option>
            <option value="transport_goods">{t('transport_goods')}</option>
            <option value="home_appliance">{t('home_appliance')}</option>
            <option value="service">{t('service')}</option>
            <option value="child_goods">{t('child_goods')}</option>
            <option value="health_and_beauty">{t('health_and_beauty')}</option>
            <option value="sport">{t('sport')}</option>
            <option value="hobby_n_Relax">{t('hobby_n_Relax')}</option>
            <option value="rest">{t('rest')}</option>
        </Form.Select>
     );
}
 
export default SelectCategory;