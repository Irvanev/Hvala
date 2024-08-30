import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { runes } from 'runes2';

import { Form, Input, Button, Upload, message, Spin } from "antd";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

import { getUserByAuth, updateUserProfile, uploadBanner, uploadPhoto } from "../../../services/settings/settings";

import { MyNavbar } from "../../../components/Navbar/Navbar";
import { NavBarBack } from "../../../components/Navbar/NavBarBack";

import styles from './settings.module.css';

import person from "../../../assets/person2.jpg"

const Settings = () => {

    const { t } = useTranslation();
    const { TextArea } = Input;

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState('');

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [emailProfile, setEmailProfile] = useState('');
    const [phone, setPhone] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [site, setSite] = useState('');
    const [description, setDescription] = useState('');
    const maxCharacters = user.role === 'seller' ? 200 : 80;
    const [error, setError] = useState('');

    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);

    const [bannerUrl, setBannerUrl] = useState(user.bannerUrl);
    const [bannerFile, setBannerFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleDeleteBanner = () => {
        setBannerUrl(null);
        setBannerFile(null);
        setPreviewUrl(null);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailProfile(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleSiteChange = (e) => {
        setSite(e.target.value);
    }

    const handleInstagramChange = (e) => {
        setInstagram(e.target.value);
        setError('');
    }

    const handleFacebookChange = (e) => {
        setFacebook(e.target.value);
        setError('');
    };

    const validateFacebookUrl = () => {
        const facebookUrlPattern = /^https?:\/\/(www\.)?facebook\.com\/.+$/;
        if (!facebookUrlPattern.test(facebook)) {
            setError(t('input_correct_link'));
        }
    };

    const validateInstagramUrl = () => {
        const instagramUrlPattern = /^https?:\/\/(www\.)?instagram\.com\/.+$/;
        if (!instagramUrlPattern.test(instagram)) {
            setError(t('input_correct_link'));
        }
    };

    const validateLink = () => {
        const urlPattern = /^[a-zA-Z0-9-_]+$/;
        if (!urlPattern.test(link)) {
          setError(t('input_correct_link'));
          return false;
        }
        return true;
      };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
        setError('');
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    useEffect(() => {
        getUserByAuth(setUser);
    }, []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhotoUrl(user.photoUrl);
            setLink(user.link);
            setSite(user.site);
            setEmailProfile(user.emailProfile);
            setPhone(user.phone);
            setInstagram(user.instagram);
            setFacebook(user.facebook);
            setDescription(user.description);
            setBannerUrl(user.bannerUrl);
        }
    }, [user]);

    const handleBannerChange = ({ file }) => {
        setBannerFile(file);
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    };

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const url = await uploadPhoto(file, user.id);
                setPhotoUrl(url);
            } catch (error) {
                console.error('Ошибка при загрузке фото:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
          setLoading(true);
          if (!validateLink()) {
            message.error(t('input_correct_link'));
            return;
          }
          await form.validateFields();
          let bannerUrlToUpdate = bannerUrl;
          if (bannerFile) {
            bannerUrlToUpdate = await uploadBanner(bannerFile);
          }
          await updateUserProfile({ name, link, description, phone, site, emailProfile, instagram, facebook, bannerUrl: bannerUrlToUpdate });
          message.success(t('profile_updated_successfully'));
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          message.error(t('profile_update_error'));
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
        <style type="text/css">
                {`
                  @media (max-width: 1000px) {
                      body {
                          padding-bottom: 3.5rem;
                      }
                `}
            </style>
            <NavBarBack />
            <MyNavbar />
            <div className='container'>
                <div className={styles.userInfo}>
                    <div className={styles.photoContainer}>
                        <img src={photoUrl || person} alt="user" className={styles.userPhoto} />
                        {loading && (
                            <div className={styles.spinOverlay}>
                                <Spin size="large" />
                            </div>
                        )}
                        <label htmlFor="photoUpload" className={styles.uploadIcon}>
                            <UploadOutlined />
                        </label>
                        <input
                            type="file"
                            id="photoUpload"
                            style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                        />
                    </div>
                </div>

                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item label={t('username')}>
                        <Input
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Form.Item>
                    <Form.Item label={t('phone_number')}>
                        <Input
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </Form.Item>
                    {(user?.role === 'admin' || user?.role === 'seller') && (
                        <>
                            <Form.Item label={t('email')}>
                                <Input
                                    type="email"
                                    value={emailProfile}
                                    onChange={handleEmailChange}
                                />
                            </Form.Item>
                            <Form.Item label={t('site')}>
                                <Input
                                    type="url"
                                    value={site}
                                    onChange={handleSiteChange}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t('instagram')}
                                validateStatus={error ? 'error' : ''}
                                help={error}
                            >
                                <Input
                                    type="url"
                                    value={instagram}
                                    onChange={handleInstagramChange}
                                    onBlur={validateInstagramUrl}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t('facebook')}
                                validateStatus={error ? 'error' : ''}
                                help={error}
                            >
                                <Input
                                    type="url"
                                    value={facebook}
                                    onChange={handleFacebookChange}
                                    onBlur={validateFacebookUrl}
                                />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item label={t('description')}>
                        <TextArea
                            value={description}
                            onChange={handleDescriptionChange}
                            count={{
                                show: true,
                                max: maxCharacters,
                                strategy: (txt) => runes(txt).length,
                                exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                            }}
                        />
                    </Form.Item>
                    {(user?.role === 'admin' || user?.role === 'seller') && (
                        <>
                            <Form.Item
                                label={t('link')}
                                validateStatus={error ? 'error' : ''}
                                help={error}
                            >
                                <Input
                                    type="text"
                                    value={link}
                                    onChange={handleLinkChange}
                                    onBlur={validateLink}
                                />
                            </Form.Item>
                            <Form.Item label={t('banner')}>
                                {previewUrl || bannerUrl ? (
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <img src={previewUrl || bannerUrl} alt="Banner" style={{ width: '100%' }} />
                                        <DeleteOutlined
                                            className={styles.deleteBanner}
                                            onClick={handleDeleteBanner}
                                        />
                                    </div>
                                ) : (
                                    <Upload
                                        name="banner"
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleBannerChange}
                                    >
                                        <Button icon={<UploadOutlined />}>{t('upload_banner')}</Button>
                                    </Upload>
                                )}
                            </Form.Item>
                        </>
                    )}
                    <div className='d-flex justify-center align-middle'>
                        <Form.Item>
                            <button className={styles.submitButton} htmlType="submit" disabled={loading}>
                                {loading ? <Spin /> : t('save')}
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default Settings;