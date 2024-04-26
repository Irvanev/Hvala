import React from "react";


const CharactersForCard = ({ adData, t }) => {
    return (
        <div>
            <h3>{t('description')}</h3>
            <div>
                {adData?.description && (
                    <div className="mt-3">
                        <p id="product-description">{adData.description}</p>
                    </div>
                )}
                <h3>{t('characteristics')}</h3>
                {adData?.condition && (
                    <div>
                        <span id="product-description">
                            {t('condition')}: <strong>{t(adData.condition)}</strong>
                        </span>
                    </div>
                )}
                {adData?.brand && (
                    <div>
                        <span id="product-description">
                            {t('brand')}: <strong>{t(adData.brand)}</strong>
                        </span>
                    </div>
                )}
                {adData?.model && (
                    <div>
                        <span id="product-description">
                            {t('model')}: <strong>{t(adData.model)}</strong>
                        </span>
                    </div>
                )}
                {adData?.memory && (
                    <div>
                        <span id="product-description">
                            {t('memory')}: <strong>{t(adData.memory)}Gb</strong>
                        </span>
                    </div>
                )}
                {adData?.screen_size && (
                    <div>
                        <span id="product-description">
                            {t('size_screen')}:<strong>{t(adData.screen_size)}</strong>
                        </span>
                    </div>
                )}
                {adData?.size && (
                    <div>
                        <span id="product-description">
                            {t('size')}: <strong>{t(adData.size)}</strong>
                        </span>
                    </div>
                )}
                {adData?.location && (
                    <div className="mt-3">
                        <h5>{t('location')}</h5>
                        <span id="product-description">{t(adData.location)}</span>
                    </div>
                )}
                {adData?.title && (
                    <div>
                        <span id="product-description">
                            {t('title')}: <strong>{t(adData.title)}</strong> 
                        </span>
                    </div>
                )}
                {adData?.price && (
                    <div>
                        <span id="product-description">
                            {t('price')}: <strong>{t(adData.price)}</strong>
                        </span>
                    </div>
                )}
                {adData?.region && (
                    <div>
                        <span id="production-description">
                            {t('region')}: <strong>{t(adData.region)}</strong>
                        </span>
                    </div>
                )}
                {adData?.country && (
                    <div>
                        <span id="production-description">
                            {t('country')}: <strong>{t(adData.country)}</strong>
                        </span>
                    </div>
                )}
                {adData?.type && (
                    <div>
                        <span id="production-description">
                            {t('type')}:<strong>{t(adData.type)}</strong> 
                        </span>
                    </div>
                )}
                {adData?.miliage &&(
                    <div>
                        <span id="production-description">
                            {t('milliage')}: <strong>{t(adData.miliage)}</strong>
                        </span>
                    </div>
                )}
                {adData?.year &&(
                    <div>
                        <span id="production-description">
                            {t('year')}: <strong>{t(adData.year)}</strong>
                        </span>
                    </div>
                )}
                {adData.body &&(
                    <div>
                        <span id="production-description">
                            {t('body')}: <strong>{t(adData.body)}</strong>
                        </span>
                    </div>
                )}
                {adData?.сolor &&(
                    <div>
                        <span id="production-description">
                            {t('color')}: <strong>{t(adData.сolor)}</strong>
                        </span>
                    </div>
                )}
                {adData?.transsmission &&(
                    <div>
                        <span id="production-description">
                            {t('transmission')}: <strong>{t(adData.transsmission)}</strong>
                        </span>
                    </div>
                )}
                {adData?.drive &&(
                    <div>
                        <span id="production-description">
                            {t('drive')}: <strong>{t(adData.drive)}</strong>
                        </span>
                    </div>
                )}
                {adData?.wheel &&(
                    <div>
                        <span id="production-description">
                            {t('wheel')}: <strong>{t(adData.wheel)}</strong>
                        </span>
                    </div>
                )}
                {adData?.owners &&(
                    <div>
                        <span id="production-description">
                            {t('owners')}: <strong>{t(adData.owners)}</strong>
                        </span>
                    </div>
                )}
                {adData?.customs &&(
                    <div>
                        <span id="production-description">
                            {t('customs')}: <strong>{t(adData.customs)}</strong>
                        </span>
                    </div>
                )}
                {adData?.coordinates && (
                    <div className="mt-3">
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU&q=${adData.coordinates.latitude},${adData.coordinates.longitude}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CharactersForCard;