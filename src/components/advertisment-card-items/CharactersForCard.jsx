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