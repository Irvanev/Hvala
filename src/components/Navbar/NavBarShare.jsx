import React from "react";
import { useHistory } from "react-router-dom";

import { NavBar } from 'antd-mobile'
import { ShareAltOutlined } from '@ant-design/icons';

export const NavBarShare = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: 'Поделиться страницей',
            url: window.location.href
          }).then(() => {
            console.log('Успешное открытие диалога "Поделиться"');
          })
            .catch((error) => {
              console.log('Ошибка при открытии диалога "Поделиться"', error);
            });
        } else {
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              console.log('Ссылка скопирована в буфер обмена');
              alert('Ссылка скопирована в буфер обмена');
            })
            .catch((err) => {
              console.log('Ошибка при копировании ссылки в буфер обмена', err);
            });
        }
      };

    return (
        <div className="d-lg-none">
            <NavBar onBack={goBack} right={<ShareAltOutlined style={{fontSize: '22px'}} onClick={handleShare}/>}
            style={{borderBottom: 'solid 1px #c4c4c4', backgroundColor: '#ebebeb', position: 'fixed', top: 0, width: '100%', zIndex: '999'}}></NavBar>
        </div>
    );
}